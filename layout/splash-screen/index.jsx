import Logo from "public/icon/icons8-discord-new.svg";
import {motion, AnimatePresence} from "framer-motion";

const SplashScreen = ({show, title}) => {

    const variants = {
        hide: {
            opacity: 0,
            scale: 2,
            transition: {
                opacity: {
                    duration: 0.4
                },
                scale: {
                    duration: 0.5
                }
            }
        },
        show: {
            opacity: 1,
            scale: 1,
            transition: {
                opacity: {
                    duration: 0.5
                },
                scale: {
                    duration: 0.4
                }
            }
        }
    }

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    variants={variants}
                    initial={false}
                    animate="show"
                    exit="hide"
                    className="[position:fixed;] w-full h-screen bg-splash-bg z-[100] top-0 left-0 flex justify-center items-center flex-col gap-4"
                >
                    <Logo className="scale-150"/>
                    {title && (
                        <h1 className="text-message-text text-[22px]">{title}</h1>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default SplashScreen;