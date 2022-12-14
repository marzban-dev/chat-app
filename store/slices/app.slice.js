import {createSlice} from "@reduxjs/toolkit";
import themes from "constants/themes.module";

const init = {
    unread: [],
    connections: [],
    rooms: [],
};

export const appSlice = createSlice({
    name: "app",
    initialState: init,
    reducers: {
        setIsRoomConnected(state, {payload}) {
            state.connections.push({
                isConnected: payload.isConnected,
                roomId: payload.roomId
            });
        },
        addUnreadMessage(state, {payload}) {
            const {id, room} = payload;
            state.unread = [...state.unread, {room, id}];
        },
        removeUnreadMessage(state, {payload}) {
            const {id, room} = payload;
            state.unread = state.unread.filter(msg => msg.room !== room && msg.id !== id);
        },
        setTheme(state, {payload}) {
            localStorage.setItem("app-theme", payload);

            const themeObj = themes[payload];
            const rootEl = document.querySelector(':root');

            Object.keys(themeObj).forEach(themeProperty => {
                rootEl.style.setProperty(themeProperty, themeObj[themeProperty]);
            });
        }
    },
});

export const {setTheme, setIsRoomConnected, addUnreadMessage, removeUnreadMessage} = appSlice.actions;

export default appSlice.reducer;