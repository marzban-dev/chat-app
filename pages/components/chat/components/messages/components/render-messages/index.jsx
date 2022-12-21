import {useMemo} from "react";
import Message from "components/message";

const RenderMessages = ({room, roomId, setReplyTo, replyTo}) => {
    return useMemo(() => {

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
                    <div className="flex justify-center items-center text-white w-full py-4 gap-3" key={index}>
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
                text: content,
                date: created_date,
                reply: reply_to,
                room: roomId,
                index
            }

            return (
                <Message
                    {...props}
                    key={id}
                    setReplyTo={setReplyTo}
                    replyTo={replyTo}
                    messagesLength={messages.length}
                />
            );
        });
    }, [room, replyTo]);
}

export default RenderMessages;