import {useState, useContext} from "react";
import ReplyTo from "./components/reply-to";
import SendButton from "./components/send-button";
import appContext from "context/app.context";
import {useRouter} from "next/router";
import ScrollDownButton from "./components/scroll-down-button";
import {useAnimation} from "framer-motion";
import MessageTextarea from "./components/message-textarea";

const MessageInput = ({replyTo, setReplyTo}) => {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [messageInputHeight, setMessageInputHeight] = useState(50);
    const {sockets} = useContext(appContext);
    const animationControls = useAnimation();
    const roomId = router.query.r ? Number(router.query.r) : null;
    const socket = sockets.find(socket => socket.id === roomId).socket;

    const onSendMessage = () => {
        const accessToken = localStorage.getItem("USER_ACCESS_TOKEN");

        if (message.length !== 0) {
            let data = {
                message: message,
                authorization: `Bearer ${accessToken}`
            }

            if (replyTo) data["reply_to"] = replyTo;

            socket.send(JSON.stringify(data));

            animationControls.start("move")

            setMessage("");
        }
    }

    return (
        <div className="fixed bottom-0 w-full left-0 px-[10px] min-[700px]:px-[30px] pb-[15px] pt-[5px] min-h-[50px] bg-secondary">
            <div className="w-full h-full flex justify-between items-end">
                <div className="w-[calc(100%_-_60px)] h-full shadow-lg bg-message-input-bg rounded-[20px] transition-all relative">
                    <MessageTextarea
                        message={message}
                        onSendMessage={onSendMessage}
                        setMessage={setMessage}
                        setMessageInputHeight={setMessageInputHeight}
                    />
                    <ReplyTo
                        replyTo={replyTo}
                        setReplyTo={setReplyTo}
                        messageInputHeight={messageInputHeight}
                    />
                </div>
                <div className="flex flex-col justify-center items-center relative">
                    <ScrollDownButton/>
                    <SendButton
                        disabled={message.length === 0}
                        onSendMessage={onSendMessage}
                        animationControls={animationControls}
                        setReplyTo={setReplyTo}
                    />
                </div>
            </div>
        </div>
    );
}

export default MessageInput;