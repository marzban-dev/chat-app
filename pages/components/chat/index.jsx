import {useState} from "react";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import Messages from "./components/messages";
import MessageInput from "./components/message-input";
import RedirectToLogin from "pages/components/chat/components/redirect-to-login";
import classNames from "classnames";
import BarsIcon from "public/icon/bars.svg";

const Chat = ({showRoomsMenu, setShowRoomsMenu}) => {
    const router = useRouter();
    const roomId = router.query.r ? Number(router.query.r) : null;
    const [replyTo, setReplyTo] = useState(null);
    const user = useSelector(state => state.auth.user);

    const containerClasses = classNames({
        "w-full min-[700px]:w-[calc(100%_-_90px)] min-[900px]:w-[calc(100%_-_350px)] h-screen bg-secondary flex flex-col justify-start items-center transition-all": 1,
        "translate-x-[50px]": showRoomsMenu,
        "translate-x-0": !showRoomsMenu
    });

    return (
        <section className={containerClasses}>
            <div className="fixed left-0 top-0 z-50 min-[700px]:hidden">
                <button
                    className="p-4 bg-gradient-to-br from-secondary to-transparent"
                    onClick={() => setShowRoomsMenu(!showRoomsMenu)}
                >
                    <BarsIcon className="fill-white w-[30px]"/>
                </button>
            </div>
            {roomId && (
                <div className="w-full h-full">
                    <Messages
                        setReplyTo={setReplyTo}
                        replyTo={replyTo}
                    />

                    {user && user !== "unauthorized" ? (
                        <MessageInput
                            replyTo={replyTo}
                            setReplyTo={setReplyTo}
                        />
                    ) : (
                        <RedirectToLogin/>
                    )}

                </div>
            )}

            {!roomId && (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex justify-center items-center flex-col gap-2">
                        <span className="text-[80px] min-[1050px]:text-[120px]">🔎</span>
                        <span className="text-title font-semibold text-[22px] min-[1050px]:text-[30px]">
                            Select a chat
                        </span>
                    </div>
                </div>
            )}

        </section>
    )
}

export default Chat;