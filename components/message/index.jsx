import classNames from "classnames";
import {motion} from "framer-motion";
import {useEffect, useRef} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {useSelector} from "react-redux";

const Message = ({id, user, text, date, reply, room, index, messagesLength, setReplyTo}) => {
    const queryClient = useQueryClient();
    const messageRef = useRef(null)
    const authedUser = useSelector(state => state.auth.user);
    const pos = authedUser?.username === user ? "right" : "left";

    // ****
    // Check if message inside viewport or not,
    // Then check if message exist in unread list or not.
    // If both are true, delete message from unread list.
    // ****
    const isMessageInsideViewport = () => {
        const boundingClientRect = messageRef.current.getBoundingClientRect();
        const isMessageExistInUnread = queryClient.getQueryData(["room", room]).unread.find(message => message.id === id);

        if (boundingClientRect.top < window.innerHeight && isMessageExistInUnread) {
            queryClient.setQueryData(["room", room], (oldRoomData) => ({
                messages: oldRoomData.messages,
                unread: oldRoomData.unread.filter(message => message.id !== id)
            }))
        }
    }

    useEffect(() => {
        const messagesContainer = document.querySelector("#messagesContainer");
        messagesContainer.addEventListener("scroll", isMessageInsideViewport);
    }, [])

    const setReplyId = () => {
        setReplyTo(id);
        const messageInput = document.querySelector("#message-input");
        messageInput.focus();
    };

    const renderMessageData = () => {
        const msgDate = new Date(date);
        const minutes = String(msgDate.getMinutes());
        return `${msgDate.getHours()}:${minutes.length === 1 ? `0${minutes}` : minutes}`
    }

    const containerClasses = classNames({
        "flex flex-col justify-start items-start max-w-[320px] min-[500px]:max-w-[400px] min-[1000px]:max-w-[500px] cursor-pointer": 1,
        "self-end": pos === "right"
    })

    const messageBoxClasses = classNames({
        "rounded-2xl py-[6px] min-[700px]:py-2 w-full": 1,
        "bg-message-send-bg rounded-tr-none": pos === "right",
        "bg-message-receive-bg rounded-tl-none": pos === "left",
    });

    const paragraphClasses = classNames({
        "text-message-text w-full whitespace-pre-wrap pl-4 pr-6 min-[700px]:px-5 break-words": 1,
        "pt-2": reply
    });

    const replyContainerClasses = classNames({
        "w-full h-[70px] transition-all rounded-[10px] overflow-hidden relative": 1,
        "bg-message-receive-reply-bg": pos === "left",
        "bg-message-send-reply-bg": pos === "right",
    });

    const usernameClasses = classNames({
        "flex items-center pb-2 gap-2 w-full" : 1,
        "justify-start flex-row-reverse" : pos === "right",
        "justify-start" : pos === "left",
    })

    const messageVariants = {
        hide: {
            opacity: 0,
            x: pos === "left" ? -40 : 40,
            transition: {
                opacity: {
                    duration: 0.2
                },
                x: {
                    duration: 0.3
                },
            }
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                opacity: {
                    duration: 0.3
                },
                x: {
                    duration: 0.2
                },
                delay: (messagesLength - 1 - index) * 0.05
            }
        }
    }

    return (
        <motion.div
            key={id}
            ref={messageRef}
            variants={messageVariants}
            initial="hide"
            animate="show"
            className={containerClasses}
            onClick={setReplyId}
        >
            <div className={usernameClasses}>
                <h1 className="text-[16px] text-message-username font-semibold">
                    {pos === "left" ? user : "You"}
                </h1>
                <span className="text-[12px] text-message-date pt-1 font-medium">
                    {renderMessageData()}
                </span>
            </div>
            <div className={messageBoxClasses}>
                {reply && (
                    <div className="px-2">
                        <div className={replyContainerClasses}>
                            {pos === "left" && <div className="w-[6px] h-full bg-primary absolute"></div>}
                            <div>
                                <div className="pt-1 pl-4 text-primary font-semibold flex justify-between items-center w-full">
                                    <span>asda</span>
                                    {/*<span>{repliedMessage?.owner?.username}</span>*/}
                                </div>
                                <p className="pt-1 pl-4 text-message-text whitespace-nowrap overflow-hidden overflow-ellipsis w-[95%]">
                                    lorem ipsum dolor
                                    {/*{repliedMessage?.content}*/}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                <p className={paragraphClasses}>
                    {text}
                </p>
            </div>
        </motion.div>
    )
}

export default Message;