import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchRoom} from "api/rooms.api";

export const useRoomQuery = (id, page) => {
    const queryClient = useQueryClient();

    return useQuery(["room", id], () => fetchRoom({id, page, prefetch: false}), {
        refetchOnWindowFocus: false,
    });
};