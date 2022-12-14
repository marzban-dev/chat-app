import {useEffect, useState} from "react";

const useBottomScrollHeight = (query) => {
    const [result, setResult] = useState({
        scrollBottom: 0,
        screenHeight: 0,
        scrollHeight: 0
    });

    const onScroll = (e, targetEl) => {
        const screenHeight = window.innerHeight;
        const scrollTop = Math.floor(targetEl.scrollTop + screenHeight);
        const scrollHeight = targetEl.scrollHeight;

        const scrollBottom = scrollHeight - scrollTop;

        setResult({
            scrollBottom,
            screenHeight,
            scrollHeight : scrollHeight - screenHeight
        });
    }

    useEffect(() => {
        const targetEl = document.querySelector(query);
        targetEl.addEventListener("scroll", e => onScroll(e, targetEl));
        return targetEl.removeEventListener("scroll", e => onScroll(e, targetEl));
    }, []);

    return result;
}

export default useBottomScrollHeight;