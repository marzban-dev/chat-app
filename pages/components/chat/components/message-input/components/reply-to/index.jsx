import {useRouter} from "next/router";
import {useRoomQuery} from "hooks/useRoomQuery";
import XIcon from "public/icon/x.svg";

const ReplyTo = ({messageInputHeight, replyTo, setReplyTo}) => {
    const router = useRouter();
    const roomId = Number(router.query.r);
    const {data: room} = useRoomQuery(roomId, 1);

    const repliedMessage = room.messages.find(message => message.id === replyTo);

    const onCloseClick = () => {
        setReplyTo(null);
        const messageInput = document.querySelector("#message-input");
        messageInput.focus();
    }

    const replyContainerStyle = {
        height: replyTo ? (95 + messageInputHeight + "px") : 50 + "px",
        opacity: replyTo ? 1 : 0,
        paddingBottom: 20 + messageInputHeight + "px"
    };

    return (
        <div
            className="w-full bg-message-input-bg absolute bottom-0 transition-all rounded-t-[10px] rounded-b-[20px] z-[10] pb-[50px] px-2 pt-2"
            style={replyContainerStyle}
        >
            <div className="bg-message-reply-bg w-full h-full rounded-[10px] overflow-hidden relative">
                <div className="w-[6px] h-full bg-primary absolute"></div>
                <div>
                    <div className="pt-1 pl-4 text-primary font-semibold flex justify-between items-center w-full">
                        <span>{repliedMessage?.owner?.username}</span>
                        <button className="px-3" onClick={onCloseClick}>
                            <XIcon className="fill-message-reply-close w-[10px]"/>
                        </button>
                    </div>
                    <p className="pt-1 pl-4 text-message-text whitespace-nowrap overflow-hidden overflow-ellipsis w-[95%]">
                        {repliedMessage?.content}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ReplyTo;