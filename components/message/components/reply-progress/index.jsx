import {useTransform, motion, useAnimation} from "framer-motion";
import ReplyIcon from "public/icon/reply.svg";
import {useEffect} from "react";
import classNames from "classnames";

const replyProgress = ({id, dragValue, setReplyTo, replyTo, user}) => {
    const animationControls = useAnimation();
    const opacity = useTransform(dragValue, [0, 60], [0, 1]);
    const scale = useTransform(dragValue, [0, 60], [0.5, 1]);

    const setReplyId = () => {
        if (user && user !== "unauthorized") {
            setReplyTo(id);
            const messageInput = document.querySelector("#message-input");
            messageInput.focus();
        }
    };

    useEffect(() => {
        dragValue.onChange(() => {
            if (dragValue.get() >= 60 && replyTo !== id) setReplyId();
        });

        return () => dragValue.onChange(() => {
        });
    }, []);

    useEffect(() => {
        animationControls.start("blink");
    }, [replyTo]);

    const circleVariants = {
        blink: {
            opacity: [1, 0],
            scale: [1, 5],
            transition: {
                opacity: {
                    duration: 0.2
                },
                scale: {
                    duration: 0.3
                }
            }
        }
    }

    const containerClasses = classNames({
        "rounded-full w-[35px] h-[35px] flex justify-center items-center absolute left-[120%] transition-colors duration-[300ms]": 1,
        "bg-message-reply-progress-active": replyTo === id,
        "bg-message-reply-progress-idle": replyTo !== id,
    });

    return (
        <motion.div
            className={containerClasses}
            style={{opacity, scale}}
        >
            <motion.div
                className="absolute w-full h-full border-2 border-primary rounded-full opacity-0"
                variants={circleVariants}
                animate={animationControls}
            />
            <ReplyIcon className="fill-white w-[18px] h-[18px]"/>
        </motion.div>
    );
}

export default replyProgress;