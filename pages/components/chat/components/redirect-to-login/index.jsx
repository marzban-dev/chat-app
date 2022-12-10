import Link from "next/link";

const RedirectToLogin = () => {
    return (
        <div className="absolute bottom-0 w-full left-0 h-[80px] bg-secondary-20 flex justify-center items-center backdrop-blur-sm">
            <Link href="/auth/signin">
                <a className="text-white font-semibold text-[18px]">To send message, please login</a>
            </Link>
        </div>
    );
}

export default RedirectToLogin;