import {useRoomsQuery} from "hooks/useRoomsQuery";
import {setIsRoomConnected} from "store/slices/app.slice";
import {useContext, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useQueryClient} from "@tanstack/react-query";
import appContext from "context/app.context";

const useInitializeWebSocket = () => {
    const dispatch = useDispatch();
    const {setSockets} = useContext(appContext);
    const {data: rooms} = useRoomsQuery();
    const queryClient = useQueryClient();
    const sockets = useRef([]);

    useEffect(() => {
        rooms.forEach(({id, name}) => {
            if (!sockets.current.find(socket => socket === id)) {
                const socket = new WebSocket(`wss://filmseries.iran.liara.run/ws/chat/${name}/`);

                sockets.current.push(id)
                setSockets(old => [...old, {socket, id}])

                socket.onopen = (e) => {
                    dispatch(setIsRoomConnected({
                        isConnected: true,
                        roomId: id
                    }));
                };

                socket.onclose = (e) => {
                    dispatch(setIsRoomConnected({
                        isConnected: false,
                        roomId: id
                    }));
                };

                socket.onmessage = (e) => {
                    const data = JSON.parse(e.data);
                    const type = data.type;
                    const message = data.message;

                    const addMessage = () => {
                        queryClient.setQueryData(["room", id], (oldRoomData) => ({
                            messages: [...oldRoomData.messages, message],
                            unread: [...oldRoomData.unread, {id: message.id}]
                        }));
                    }

                    switch (type) {
                        case "chat_message" :
                            addMessage();
                            break;
                    }
                };
            }
        });
    }, []);
}

export default useInitializeWebSocket;