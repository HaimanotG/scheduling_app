import { LOGIN, API, CHECK_USER, LOGOUT } from "../_constants/action-types";

export const auth = ({ username, password }) => ({
    type: API,
    payload: {
        url: "/users/login",
        method: "post",
        body: { username, password },
        next: LOGIN,
        failureMessage: "Failed to login"
    },
});

export const checkSession = () => ({
    type: API,
    payload: {
        url: "/users/checkSessionToken",
        method: "get",
        next: CHECK_USER
    }
})

export const logout = () => ({
    type: LOGOUT
})