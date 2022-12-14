import {useRoomsQuery} from "hooks/useRoomsQuery";
import {addUnreadMessage, setIsRoomConnected} from "store/slices/app.slice";
import {useCallback, useContext, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useQueryClient} from "@tanstack/react-query";
import appContext from "context/app.context";
import usePushNotification from "hooks/usePushNotification";

const useInitializeWebSocket = () => {
    const dispatch = useDispatch();
    const {sockets, setSockets} = useContext(appContext);
    const {data: rooms} = useRoomsQuery();
    const queryClient = useQueryClient();
    const socketsIds = useRef([]);

    useEffect(() => {
        rooms.forEach(({id, name}) => {
            if (!socketsIds.current.find(socket => socket === id)) {
                const socket = new WebSocket(`wss://filmseries.iran.liara.run/ws/chat/${name}/`);
                socketsIds.current.push(id)
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
                        dispatch(addUnreadMessage({id: message.id, room: message.room}));
                        queryClient.setQueryData(["room", id], (oldRoomData) => {
                            const {pageParams, pages} = oldRoomData;

                            let copyOfPages = [...pages];
                            copyOfPages[0] = [...pages[0], message];

                            return {
                                pages: copyOfPages,
                                pageParams
                            }
                        });
                    }

                    switch (type) {
                        case "chat_message" :
                            addMessage();
                            break;
                    }
                };
            }
        });

        return () => {
            sockets.forEach(socket => {
                console.log(socket);
                console.log(sockets);
                // if(socket) socket.close();
            })
        }
    }, []);
}

export default useInitializeWebSocket;