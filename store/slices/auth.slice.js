import {createSlice} from "@reduxjs/toolkit";

const init = {
    user: null
};

export const userSlice = createSlice({
    name: "auth",
    initialState: init,
    reducers: {
        setUser(state, {payload}) {
            state.user = payload;
        },
    },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;