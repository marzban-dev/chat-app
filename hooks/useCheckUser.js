import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {checkRefreshToken, fetchUser} from "api/auth.api";
import {setUser} from "store/slices/auth.slice";

const useCheckUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const accessToken = localStorage.getItem("USER_ACCESS_TOKEN");
            const refreshToken = localStorage.getItem("USER_REFRESH_TOKEN");

            try {
                if (accessToken) {
                    const user = await fetchUser(accessToken);
                    dispatch(setUser(user));
                } else {
                    throw new Error("access is undefined or has problem");
                }
            } catch (err) {
                if (refreshToken) {
                    try {
                        const newTokens = await checkRefreshToken(refreshToken);

                        const user = await fetchUser(newTokens.access);
                        dispatch(setUser(user));

                        localStorage.setItem("USER_ACCESS_TOKEN", newTokens.access);
                        // localStorage.setItem("USER_REFRESH_TOKEN", newTokens.refresh);
                    } catch (err) {
                        dispatch(setUser("unauthorized"));
                    }
                } else {
                    dispatch(setUser("unauthorized"));
                }
            }
        })();
    }, []);
}

export default useCheckUser;