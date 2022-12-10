import Head from 'next/head';
import Rooms from "pages/components/rooms";
import Chat from "pages/components/chat";
import {useSelector} from "react-redux";
import SplashScreen from "layout/splash-screen";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {fetchRoom, fetchRooms} from "api/rooms.api";
import useInitializeWebSocket from "hooks/useInitializeWebSocket";
import {useEffect, useState} from "react";

export default function Home() {
    useInitializeWebSocket();
    const connections = useSelector(store => store.app.connections);
    const isConnected = connections.length !== 0 && connections.every(connection => connection.isConnected);
    const user = useSelector(state => state.auth.user);

    const [showRoomsMenu, setShowRoomsMenu] = useState(false);

    // const changeTheme1 = () => {
    //     dispatch(setTheme({
    //         primary: "#df0e0e",
    //         secondary: "#dfd48a"
    //     }))
    // }

    return (
        <div className="flex justify-center items-end overflow-x-hidden">
            <Head>
                <title>Chat App {isConnected && "CONNECTED"}</title>
                <meta name="description" content="The chat app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Rooms showRoomsMenu={showRoomsMenu} setShowRoomsMenu={setShowRoomsMenu}/>

            <Chat showRoomsMenu={showRoomsMenu}/>

            {/*<SplashScreen show={!isConnected || !user} title="Loading"/>*/}
        </div>
    )
}

export const getServerSideProps = async (context) => {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["rooms"], () => fetchRooms());

    const rooms = queryClient.getQueryData(["rooms"]);

    for (const room of rooms) {
        await queryClient.prefetchQuery(["room", room.id], async () => {
            return await fetchRoom({
                id: room.id,
                page: 1,
                prefetch: true
            });
        });
    }

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};