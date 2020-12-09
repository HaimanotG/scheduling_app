import {
    API,
    LOGIN,
    CHECK_USER,
    LOGOUT,
    CHANGE_PASSWORD,
    CHANGE_PROFILE
} from "../_constants/action-types";

export const login = ({ username, password }) => ({
    type: API,
    payload: {
        url: "/users/login",
        method: "post",
        body: { username, password },
        next: LOGIN,
        failureMessage: "Failed to login",
        onSuccessRedirect: "$toRole",
    }
});

export const checkSession = () => ({
    type: API,
    payload: {
        url: "/users/checkSessionToken",
        method: "get",
        next: CHECK_USER,
        onSuccessRedirect: "$toRole",
    }
});

export const logout = () => ({
    type: LOGOUT
});

export const changePassword = ({ oldPassword, newPassword }) => ({
    type: API,
    payload: {
        url: "/users/change-password",
        body: { oldPassword, newPassword },
        method: "patch",
        next: CHANGE_PASSWORD,
        successMessage: "Password changed Successfully",
        failureMessage: "Failed to change Password",
        onSuccessRedirect: "$toRole",
    }
});

export const changeProfile = ({ email, fullName, id }) => ({
    type: API,
    payload: {
        url: `/users/${id}`,
        body: { email, fullName },
        method: "patch",
        next: CHANGE_PROFILE,
        successMessage: "Profile changed Successfully",
        failureMessage: "Failed to change Profile",
        onSuccessRedirect: "$toRole",
    }
});
