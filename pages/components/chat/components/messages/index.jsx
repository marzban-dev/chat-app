import {useMemo, useEffect} from "react";
import Message from "components/message";
import {useRoomQuery} from "hooks/useRoomQuery";
import {goToLastMessage} from "pages/components/chat/chat.utils";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import useBottomScrollHeight from "hooks/useBottomScrollHeight";

const Messages = ({page, setReplyTo, replyTo}) => {
    const router = useRouter();
    const roomId = router.query.r ? Number(router.query.r) : null;
    const {data: room} = useRoomQuery(roomId, page);
    const {scrollBottom, screenHeight} = useBottomScrollHeight("#messagesContainer");

    useEffect(() => {
        goToLastMessage();
    }, [roomId]);

    useEffect(() => {
        if (scrollBottom < screenHeight) goToLastMessage(true);
    }, [room]);

    const messages = useMemo(() => {
        const messages = room.messages;

        return messages.map(({id, content, created_date, reply_to, owner}, index) => {
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
        <div className="overflow-y-scroll h-full w-full pt-[60px] px-[20px] min-[700px]:px-[40px] pb-[300px] hide-scrollbar gap-3 min-[700px]:gap-4 flex justify-start items-start flex-col" id="messagesContainer">
            {messages}
        </div>
    )
}

export default Messages;