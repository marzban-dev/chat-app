import {useMemo} from "react";
import classNames from "classnames";
import {useRoomQuery} from "hooks/useRoomQuery";

const MessageReply = ({reply, room}) => {
    const {data: roomObject} = useRoomQuery(room);

    const repliedMessage = useMemo(() => {
        return roomObject.pages.flat().find(message => message.id === reply);
    }, []);

    const replyContainerClasses = classNames({
        "w-full h-[70px] transition-all rounded-[10px] overflow-hidden relative bg-message-reply-bg": 1,
    });

    const scrollIntoRepliedMessage = (e) => {
        e.stopPropagation();
        const messageContainer = document.getElementById(reply);
        messageContainer.scrollIntoView({
            behavior: "smooth"
        })
    }

    return reply && (
        <div className="px-2" onClick={repliedMessage ? scrollIntoRepliedMessage : undefined}>
            <div className={replyContainerClasses}>
                <div className="w-[6px] h-full bg-primary absolute"></div>
                <div>
                    <div className="pt-1 px-4 text-primary font-semibold flex justify-between items-center w-full">
                        <span>{repliedMessage ? repliedMessage.owner.username : "Undefined"}</span>
                    </div>
                    <p className="pt-1 pl-4 text-message-text whitespace-nowrap overflow-hidden overflow-ellipsis w-[95%]">
                        {repliedMessage ? repliedMessage.content : "Undefined"}
                    </p>
                </div>
            </div>
        </div>
    )

}

export default MessageReply;