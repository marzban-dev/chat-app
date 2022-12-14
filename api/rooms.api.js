import axios from "config/axios";

export const fetchRoom = async ({pageParam}) => {
    const {id, page} = pageParam;

    try {
        const limit = 80;

        const roomMessages = await axios.get(`/chatroom/messages/`, {
            params: {
                limit,
                offset: (limit * page) - limit,
                room: id,
                ordering: "-created_date"
            }
        });

        return roomMessages.data.results.reverse();

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