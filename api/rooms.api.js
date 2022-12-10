import axios from "config/axios";
import {QueryClient} from "@tanstack/react-query";

export const fetchRoom = async ({id, page, prefetch}) => {
    const queryClient = new QueryClient();

    try {
        const limit = 40;

        const roomMessages = await axios.get(`/chatroom/messages/`, {
            params: {
                limit,
                offset: (limit * page) - limit,
                room: id,
                ordering: "-created_date"
            }
        });

        if (prefetch) {
            return {
                messages: roomMessages.data.results.reverse(),
                unread: []
            }
        } else {
            const oldData = queryClient.getQueryData(["room", id]);

            let newData = {
                messages: [],
                unread: []
            };

            if (oldData && oldData.messages) {
                newData.messages = [...response, ...oldData.messages]
                newData.unread = [...oldData.unread]
            }

            newData.messages = [...response];

            return newData;
        }

    } catch (e) {
        console.log("ERROR IN ROOM =>", e);
    }
};

export const fetchRooms = async () => {
    try {
        const response = await axios.get("/chatroom/rooms/");
        return response.data.results;
    } catch (e) {
        console.log("ERROR IN ROOMS =>", e);
    }
};