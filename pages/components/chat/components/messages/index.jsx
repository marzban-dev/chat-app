import {useMemo, useEffect, useState, useRef} from "react";
import Message from "components/message";
import {useRoomQuery} from "hooks/useRoomQuery";
import {goToLastMessage} from "pages/components/chat/chat.utils";
import {useRouter} from "next/router";
import useBottomScrollHeight from "hooks/useBottomScrollHeight";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import Spinner from "components/spinner";
import usePushNotification from "hooks/usePushNotification";

const Messages = ({page, setReplyTo, setPage}) => {
    const router = useRouter();
    const roomId = router.query.r ? Number(router.query.r) : null;
    const {data: room, fetchNextPage, isFetching} = useRoomQuery(roomId);
    const {scrollBottom, screenHeight} = useBottomScrollHeight("#messagesContainer");
    const subscription = usePushNotification();

    const x = useInfiniteScroll({
        scrollableContainerQuery: "#messagesContainer",
        isLoading: isFetching,
        nextCallback: async () => {
            await fetchNextPage();
        },
        room: roomId
    });

    useEffect(() => {
        goToLastMessage();
    }, [roomId]);

    useEffect(() => {
        // fetch('http://192.168.1.14:3000/api/notification', {
        fetch('http://localhost:3000/api/notification', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                subscription: subscription,
                payload: "New message",
                delay: 5,
                ttl: 0,
            }),
        });

        if (scrollBottom < screenHeight) goToLastMessage(true);
    }, [room]);

    const messages = useMemo(() => {

        let messages = room.pages.flat().sort((a, b) => a.id - b.id);

        // Grouping each message by its created date
        messages = messages.reduce((prev, message) => {
            const messagesList = [...prev];

            const messageDate = new Date(message.created_date).toDateString();

            if (!messagesList.includes(messageDate)) {
                messagesList.push(messageDate);
                messagesList.push(message);
            } else {
                messagesList.push(message);
            }

            return messagesList;
        }, []);


        return messages.map((message, index) => {

            if (typeof message === "string") {
                return (
                    <div className="flex justify-center items-center text-white w-full py-4 gap-3">
                        <div className="w-full bg-secondary-10 h-[2px]"/>
                        <span className="whitespace-nowrap">{message}</span>
                        <div className="w-full bg-secondary-10 h-[2px]"/>
                    </div>
                )
            }

            const {id, content, created_date, reply_to, owner} = message;

            const props = {
                id,
                user: owner.username,
                key: id,
                text: content,
                date: created_date,
                reply: reply_to,
                room: roomId,
                index
            }

            return (
                <Message
                    {...props}
                    setReplyTo={setReplyTo}
                    messagesLength={messages.length}
                />
            );
        });
    }, [room]);

    return (
        <div
            className="overflow-y-scroll h-full w-full pt-[60px] pb-[300px] hide-scrollbar min-[700px]:gap-4 flex justify-start items-start flex-col px-[20px] min-[700px]:px-[40px]"
            id="messagesContainer"
        >
            <div className="w-full flex justify-center items-center py-12">
                <Spinner show={isFetching}/>
            </div>
            {messages}
        </div>
    )
}

export default Messages;