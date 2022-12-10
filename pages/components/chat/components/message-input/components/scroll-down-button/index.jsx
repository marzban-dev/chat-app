import {AnimatePresence, motion} from "framer-motion";
import AnglesDown from "public/icon/angles-down.svg";
import {goToLastMessage} from "pages/components/chat/chat.utils";
import {useEffect, useState} from "react";
import useBottomScrollHeight from "hooks/useBottomScrollHeight";

const ScrollDownButton = ({room}) => {
    const {screenHeight, scrollBottom} = useBottomScrollHeight("#messagesContainer");
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (scrollBottom > screenHeight) setShow(true);
        else setShow(false);
    }, [scrollBottom]);

    const scrollToDown = () => {
        goToLastMessage(true);
        const messageInput = document.querySelector("#message-input");
        messageInput.focus();
    };

    const buttonVariants = {
        hide: {
            scale: 0.5,
            y: 20,
            opacity: 0,
            transition: {
                duration: 0.2,
                opacity: {
                    duration: 0.1
                }
            }
        },
        show: {
            scale: 1,
            y: 0,
            opacity: 1
        }
    }

    return (
        <div className="w-[50px] h-[50px] flex justify-center items-center absolute bottom-[55px]">
            <AnimatePresence mode="wait" initial={false}>
                {show && (
                    <motion.button
                        onClick={scrollToDown}
                        className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-message-down-button shadow-lg hover:bg-message-down-button-hover transition-colors"
                        variants={buttonVariants}
                        initial="hide"
                        animate="show"
                        exit="hide"
                    >
                        <AnglesDown className="w-[12px] fill-message-down-button-icon translate-x-[-0.5px]"/>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ScrollDownButton;