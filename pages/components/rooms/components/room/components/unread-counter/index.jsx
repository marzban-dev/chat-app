const UnreadCounter = ({room}) => {

    return (
        <div className="pl-6 max-[900px]:absolute max-[900px]:top-0 max-[900px]:right-0">
            {room.unread.length !== 0 && (
                <div className="flex justify-center items-center bg-primary text-title w-[20px] h-[20px] rounded-full text-[12px] font-semibold">
                    {room.unread.length}
                </div>
            )}
        </div>
    )
}

export default UnreadCounter;