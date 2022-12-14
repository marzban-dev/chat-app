import {AnimatePresence, motion} from "framer-motion";
import SpinnerIcon from "public/icon/spinner.svg";

const Spinner = ({show}) => {
    return (
        <AnimatePresence initial={false}>
            {show && (
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.2}}
                >
                    <motion.div
                        animate={{rotateZ: [0, 360]}}
                        transition={{
                            ease: "linear",
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                    >
                        <SpinnerIcon className="fill-white w-[30px]"/>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Spinner;