import {useSelector} from "react-redux";
import classNames from "classnames";

const UnreadCounter = ({room, fab = false}) => {
    const unread = useSelector(state => state.app.unread.filter(unread => unread.room === room));

    const containerClasses = classNames({
        "absolute top-[-14px]" : fab,
        "pl-6 max-[900px]:absolute max-[900px]:top-0 max-[900px]:right-0" : !fab
    });

    return (
        <div className={containerClasses}>
            {unread && unread.length !== 0 && (
                <div className="flex justify-center items-center text-title w-[20px] h-[20px] rounded-full text-[12px] font-semibold bg-primary">
                    {unread.length}
                </div>
            )}
        </div>
    )
}

export default UnreadCounter;