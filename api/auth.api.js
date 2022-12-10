import axios from "config/axios";

export const signin = async ({username, password}) => {
    const response = await axios.post("/auth/jwt/create/", {username, password});
    return response.data;
}

export const signup = async ({username, email, password}) => {
    const response = await axios.post("/auth/users/", {username, email, password});
    return response.data;
}

export const fetchUser = async (token) => {
    const response = await axios.get("/auth/users/me/", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
}

export const checkRefreshToken = async (token) => {
    const response = await axios.post("/auth/jwt/refresh/", {
        refresh: token
    });

    return response.data;
}