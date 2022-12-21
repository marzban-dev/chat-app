import TextareaAutosize from "react-textarea-autosize";

const MessageTextarea = ({message, setMessage, onSendMessage, setMessageInputHeight}) => {

    const onInputChange = (e) => setMessage(e.target.value);

    const onTextAreaKeyDown = (e) => {
        if (!e.ctrlKey && e.key === "Enter") {
            e.preventDefault()
            if (message.length !== 0) onSendMessage();
        }

        if (e.ctrlKey && e.key === "Enter") {
            setMessage(oldMsg => oldMsg + "\n");
        }
    }

    return (
        <TextareaAutosize
            className="px-6 pb-2 pt-3 w-full text-message-input-text bg-transparent outline-none placeholder:text-message-input-placeholder relative z-[20] resize-none hide-scrollbar transition-all"
            onHeightChange={(h) => setMessageInputHeight(h)}
            placeholder="Write your message"
            onChange={onInputChange}
            onKeyDown={onTextAreaKeyDown}
            id="message-input"
            value={message}
            maxRows={5}
            type="text"
            autoFocus
        />
    );
}

export default MessageTextarea;