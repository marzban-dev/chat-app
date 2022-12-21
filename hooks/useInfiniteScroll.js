import {useEffect, useState} from "react";
import useBottomScrollHeight from "hooks/useBottomScrollHeight";

const useInfiniteScroll = ({scrollableContainerQuery, nextCallback, isLoading, room}) => {
    const [hasMore, setHasMore] = useState(true);
    const {scrollBottom, scrollHeight} = useBottomScrollHeight(scrollableContainerQuery);

    useEffect(() => {
        (async () => {
            if (scrollBottom + 10 >= scrollHeight && hasMore && !isLoading) {
                await nextCallback();
            }
        })();
    }, [scrollBottom]);

    useEffect(() => {
        // Keep last scroll position ,after new messages added to top.
        if (!isLoading) {
            const messageId = localStorage.getItem(`ROOM_${room}_SCROLL_POSITION`);
            const messageEl = document.getElementById(messageId);
            messageEl.scrollIntoView();
        }
    }, [isLoading]);

    // return {
    //     setHasMore
    // };
}

export default useInfiniteScroll;