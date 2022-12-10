import {appSlice} from "store/slices/app.slice";
import {userSlice} from "store/slices/auth.slice";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        [appSlice.name]: appSlice.reducer,
        [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
})

export default store;
