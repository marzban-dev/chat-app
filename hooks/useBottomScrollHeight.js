import {useEffect, useState} from "react";

const useBottomScrollHeight = (query) => {
    const [result, setResult] = useState({
        scrollBottom: 0,
        screenHeight: 0
    });

    useEffect(() => {
        const targetEl = document.querySelector(query);
        targetEl.addEventListener("scroll", () => {
            const screenHeight = window.innerHeight;
            const scrollTop = Math.floor(targetEl.scrollTop + screenHeight);
            const scrollHeight = targetEl.scrollHeight;

            const scrollBottom = scrollHeight - scrollTop;

            setResult({
                scrollBottom,
                screenHeight
            })
        });
    }, []);

    return result;
}

export default useBottomScrollHeight;