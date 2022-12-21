import {useMemo, useEffect, useState, useRef} from "react";
import Message from "components/message";
import {useRoomQuery} from "hooks/useRoomQuery";
import {goToLastMessage} from "pages/components/chat/chat.utils";
import {useRouter} from "next/router";
import useBottomScrollHeight from "hooks/useBottomScrollHeight";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import Spinner from "components/spinner";
import usePushNotification from "hooks/usePushNotification";
import RenderMessages from "./components/render-messages";

const Messages = ({replyTo, setReplyTo}) => {
    const router = useRouter();
    const roomId = router.query.r ? Number(router.query.r) : null;
    const {data: room, fetchNextPage, isFetching} = useRoomQuery(roomId);
    const {scrollBottom, screenHeight} = useBottomScrollHeight("#messagesContainer");
    const subscription = usePushNotification();

    useInfiniteScroll({
        scrollableContainerQuery: "#messagesContainer",
        isLoading: isFetching,
        nextCallback: async () => await fetchNextPage(),
        room: roomId
    });

    useEffect(() => {
        goToLastMessage();
    }, [roomId]);

    useEffect(() => {
        // Send push notification request to the server
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

    return (
        <div
            className="overflow-y-scroll h-full w-full pt-[60px] pb-[300px] hide-scrollbar gap-4 flex justify-start items-start flex-col px-[20px] min-[700px]:px-[40px]"
            id="messagesContainer"
        >
            <div className="w-full flex justify-center items-center py-12">
                <Spinner show={isFetching}/>
            </div>
            <RenderMessages
                room={room}
                setReplyTo={setReplyTo}
                replyTo={replyTo}
                roomId={roomId}
            />
        </div>
    )
}

export default Messages;