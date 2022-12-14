import {useInfiniteQuery} from "@tanstack/react-query";
import {fetchRoom} from "api/rooms.api";

export const useRoomQuery = (id) => {
    return useInfiniteQuery(["room", id], fetchRoom, {
        getNextPageParam(lastPage, pages) {
            return {id, page: pages.length + 1}
        },
        refetchOnWindowFocus: false,
    });
};