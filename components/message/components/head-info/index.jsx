import classNames from "classnames";

const DateTime = ({pos, user, date}) => {
    const usernameClasses = classNames({
        "flex items-center pb-2 gap-2 w-full": 1,
        "justify-start flex-row-reverse": pos === "right",
        "justify-start": pos === "left",
    })

    const renderMessageData = () => {
        const msgDate = new Date(date);
        const minutes = String(msgDate.getMinutes());
        return `${msgDate.getHours()}:${minutes.length === 1 ? `0${minutes}` : minutes}`
    }

    return (
        <div className={usernameClasses}>
            <h1 className="text-[16px] text-message-username font-semibold">
                {pos === "left" ? user : "You"}
            </h1>
            <span className="text-[12px] text-message-date pt-1 font-medium">
                    {renderMessageData()}
                </span>
        </div>
    );
}

export default DateTime;