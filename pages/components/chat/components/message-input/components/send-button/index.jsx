import SendIcon from "public/icon/paper-plane-top.svg";
import {motion} from "framer-motion";
import classNames from "classnames";

const SendButton = ({onSendMessage, disabled, animationControls, setReplyTo}) => {

    const iconClasses = classNames({
        "w-[20px] translate-x-0.5 transition-colors": 1,
        "fill-message-input-button-icon": !disabled,
        "fill-message-input-button-icon-disable": disabled
    });

    const buttonClasses = classNames({
        "w-[50px] h-[50px] flex justify-center items-center rounded-full shadow-lg transition-colors": 1,
        "bg-message-input-button hover:bg-message-input-button-hover": !disabled,
        "bg-message-input-button": disabled
    });

    const onClick = () => {
        onSendMessage()
        animationControls.start("move");
        setReplyTo(null);
        const messageInput = document.querySelector("#message-input");
        messageInput.focus();
    };

    const iconVariants = {
        move: {
            x: [0, 20, -20, 0],
            opacity: [1, 0, 0, 1],
            scale: [1, 0.5, 0.5, 1],
            transition: {
                duration: 0.5,
                x: {
                    duration: 0.4
                },
                opacity: {
                    duration: 0.4
                }
            }
        }
    }

    return (
        <button
            disabled={disabled}
            className={buttonClasses}
            onClick={onClick}
        >
            <motion.div
                variants={iconVariants}
                animate={animationControls}
            >
                <SendIcon className={iconClasses}/>
            </motion.div>
        </button>
    )
}

export default SendButton;