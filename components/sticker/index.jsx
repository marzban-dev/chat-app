import classNames from "classnames";
import Image from "next/image";
import Sticker1 from "public/stickers/s1.jpg";

const Sticker = ({pos, user, url}) => {

    const imageClasses = classNames({
        "rounded-2xl min-w-[200px] min-h-[200px] relative bg-red-400 overflow-hidden": 1,
        "self-end": pos === "right",
    });

    return (
        <div className="flex flex-col justify-start items-start">
            {pos === "left" && (
                <h1 className="text-[16px] text-primary ml-5 pb-2">
                    {user}
                </h1>
            )}
            <div className={imageClasses}>
                <Image src={Sticker1} layout="fill" objectFit="cover"/>
            </div>
        </div>
    )
}

export default Sticker;