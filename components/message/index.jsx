import classNames from "classnames";
import {motion, useMotionValue} from "framer-motion";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {removeUnreadMessage} from "store/slices/app.slice";
import HeadInfo from "./components/head-info";
import MessageReply from "./components/message-reply";
import MessageText from "./components/message-text";
import ReplyProgress from "./components/reply-progress";

const Message = ({id, user, text, date, reply, room, index, messagesLength, setReplyTo, replyTo}) => {
    const dispatch = useDispatch();
    const messageRef = useRef(null)
    const authedUser = useSelector(state => state.auth.user);
    const pos = authedUser?.username === user ? "right" : "left";
    const dragValue = useMotionValue(0);

    // ****
    // Check if message inside viewport or not,
    // If true, delete message from unread list.
    // ****
    const isMessageInUnread = useRef(true);
    const isMessageInsideViewport = () => {
        const boundingClientRect = messageRef.current.getBoundingClientRect();

        if (boundingClientRect.top < window.innerHeight) {
            localStorage.setItem(`ROOM_${room}_SCROLL_POSITION`, id);
        }

        if (isMessageInUnread.current && boundingClientRect.top < window.innerHeight) {
            dispatch(removeUnreadMessage({id, room}));
            isMessageInUnread.current = false;
        }
    }

    useEffect(() => {
        const messagesContainer = document.querySelector("#messagesContainer");
        messagesContainer.addEventListener("scroll", isMessageInsideViewport);
        return () => messagesContainer.removeEventListener("scroll", isMessageInsideViewport);
    }, [])

    const onMotionUpdate = (latest) => {
        dragValue.set(Math.abs(latest.x));
    }

    const onMessageDragStart = (e, info) => {
        // console.log(info);
    }

    const onMessageDragEnd = (e, info) => {
        // console.log(info);
    }

    const containerClasses = classNames({
        "max-w-[320px] min-[500px]:max-w-[400px] min-[1000px]:max-w-[500px]": 1,
        "self-end": pos === "right",
        "cursor-pointer": authedUser && authedUser !== "unauthorized"
    })

    const messageBoxClasses = classNames({
        "rounded-2xl py-[6px] min-[700px]:py-2 w-full": 1,
        "bg-message-send-bg rounded-tr-none": pos === "right",
        "bg-message-receive-bg rounded-tl-none": pos === "left",
    });

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
                }
            }
        }
    }

    return (
        <motion.div
            id={id}
            drag="x"
            ref={messageRef}
            variants={messageVariants}
            initial="hide"
            animate="show"
            className={containerClasses}
            dragConstraints={{left: 0, right: 0}}
            dragElastic={{left: 0.4}}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}
            onDragStart={onMessageDragStart}
            onDragEnd={onMessageDragEnd}
            onUpdate={onMotionUpdate}
        >

            <HeadInfo
                date={date}
                pos={pos}
                user={user}
            />
            <div className="flex justify-start items-center relative">
                <div className={messageBoxClasses}>
                    <MessageReply
                        room={room}
                        reply={reply}
                    />
                    <MessageText
                        text={text}
                        reply={reply}
                    />
                </div>
                <ReplyProgress
                    id={id}
                    dragValue={dragValue}
                    setReplyTo={setReplyTo}
                    replyTo={replyTo}
                    user={authedUser}
                />
            </div>
        </motion.div>
    )
}

export default Message;