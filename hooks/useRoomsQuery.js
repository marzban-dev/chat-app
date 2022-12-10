import {useQuery} from "@tanstack/react-query";
import {fetchRooms} from "api/rooms.api";

export const useRoomsQuery = () => {
    return useQuery(["rooms"], () => fetchRooms(), {
        refetchOnWindowFocus: false,
    });
};