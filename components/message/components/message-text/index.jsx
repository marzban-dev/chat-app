import classNames from "classnames";

const MessageText = ({text, reply}) => {
    const paragraphClasses = classNames({
        "text-message-text w-full whitespace-pre-wrap pl-4 pr-6 min-[700px]:px-5 break-words": 1,
        "pt-2": reply
    });

    return (
        <p className={paragraphClasses}>
            {text}
        </p>
    );
}

export default MessageText;