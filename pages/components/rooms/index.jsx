import Room from "./components/room";
import {useRoomsQuery} from "hooks/useRoomsQuery";
import {useMediaQuery} from "react-responsive";
import classNames from "classnames";
import {motion, AnimatePresence} from "framer-motion";
import {useEffect} from "react";
import useDetectScreenDrag from "hooks/useDetectScreenDrag";

const Rooms = ({showRoomsMenu, setShowRoomsMenu}) => {
    const {data: rooms} = useRoomsQuery();
    const isDraggedOnAxis = useDetectScreenDrag("right", 80);
    const isMobile = useMediaQuery({query: "(max-width: 700px)"});

    useEffect(() => {
        if (!isMobile) setShowRoomsMenu(false);
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) setShowRoomsMenu(isDraggedOnAxis);
    }, [isDraggedOnAxis]);

    const renderRooms = () => {
        return rooms.map((room, index) => {
            return (
                <Room
                    {...room}
                    setShowRoomsMenu={setShowRoomsMenu}
                    index={index}
                    key={room.id}
                />
            );
        });
    }

    const containerClasses = classNames({
        "w-[90px] min-[900px]:w-[350px] h-screen bg-menu-bg shadow-lg max-[700px]:fixed z-[50] left-0 top-0 transition-all": 1,
        "left-[-100%]": !showRoomsMenu,
        "left-0": showRoomsMenu,
    });

    return (
        <aside>
            <AnimatePresence>
                {showRoomsMenu && (
                    <motion.div
                        className="min-[700px]:hidden bg-menu-overlay w-full h-screen z-[50] fixed top-0"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{ease: "linear", duration: 0.15}}
                        onClick={() => setShowRoomsMenu(!showRoomsMenu)}
                    />
                )}
            </AnimatePresence>
            <div className={containerClasses}>
                <div className="w-full hidden min-[900px]:flex justify-start items-center pt-6 pb-8 px-5">
                    <h2 className="text-title text-[32px] font-semibold">Rooms</h2>
                </div>
                <div className="w-full">
                    {renderRooms()}
                </div>
            </div>
        </aside>
    )
}

export default Rooms;