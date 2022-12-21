import {useRouter} from "next/router";
import classNames from "classnames";
import {useRoomQuery} from "hooks/useRoomQuery";
import {useMemo} from "react";
import UnreadCounter from "./components/unread-counter";
import {useMediaQuery} from "react-responsive";

const Room = ({id, name, setShowRoomsMenu, index}) => {
    const router = useRouter();
    const isRoomActive = router.query.r === String(id);
    const {data: room} = useRoomQuery(id, 1);
    const showMobileUnreadCounter = useMediaQuery({query: "(max-width: 899px)"});

    const navigateToRoom = () => {
        setShowRoomsMenu(old => !old);
        router.push(`/?r=${id}`, null, {shallow: true});
    }

    const lastMessage = useMemo(() => {
        const firstPage = room.pages[0];
        if (firstPage.length !== 0) return firstPage[firstPage.length - 1];
        return null;
    }, [room]);

    let profiles = [
        "🍕", "🍟", '🍔', '🌭', '🥞', '🍳', '🥓',
        '🥪', '🥫', '🍩', '🧁', '🍧', '🍰', '🎂',
        '🍬', '🍫', '🍻', '🍾', '🍷', '🧊', '🍉',
        '🍒', '🍓', '🍅', '🍌', '🥝', '🥥', '🌶',
        '🌽', '🥑', '🍄', '🌸', '🌼', '🌺', '🌻',
        '🌹', '🌱', '🪴', '🌲', '🌷', '🍁',
        '🌵', '🥀', '🍃', '🍂', '🍀',
    ];

    const containerClasses = classNames({
        "flex justify-start items-center w-full cursor-pointer transition-colors select-none": 1,
        "bg-room-bg": isRoomActive
    });

    const renderMessageData = () => {
        const msgDate = new Date(lastMessage ? lastMessage.created_date : "");
        const minutes = String(msgDate.getMinutes());
        return `${msgDate.getHours()}:${minutes.length === 1 ? `0${minutes}` : minutes}`
    }

    return (
        <div className={containerClasses} onClick={navigateToRoom}>
            <div className="hover:bg-room-bg w-full py-4 min-[900px]:px-5 flex justify-center min-[900px]:justify-start items-center transition-colors">
                <div className="flex justify-center min-[900px]:justify-start items-center w-[80px]">
                    <div className="min-w-[65px] min-h-[65px] bg-secondary flex justify-center items-center rounded-full relative">
                        <span className="text-[30px]">{profiles[index]}</span>
                        {/*{showMobileUnreadCounter && <UnreadCounter room={room}/>}*/}
                    </div>
                </div>
                <div className="hidden min-[900px]:flex justify-center items-start flex-col w-[calc(100%_-_80px)] gap-1">
                    <div className="flex justify-between items-center w-full">
                        <span className="text-room-name text-[18px] whitespace-nowrap overflow-hidden overflow-ellipsis w-full">{name}</span>
                        <span className="text-room-last-msg-date whitespace-nowrap pl-6">{lastMessage && renderMessageData()}</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                        <span className="text-room-last-msg whitespace-nowrap overflow-hidden overflow-ellipsis w-full">
                            <span className="text-room-last-msg-writer">{lastMessage && lastMessage.owner.username + " : "}</span>
                            {lastMessage ? lastMessage.content : "No message sent"}
                        </span>
                        <UnreadCounter room={id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Room;