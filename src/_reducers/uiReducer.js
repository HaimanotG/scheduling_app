import {
    CHANGE_THEME_MODE,
    SET_MESSAGE,
    CLEAR_MESSAGE,
    LOAD_THEME_MODE,
    LOAD_PRIMARY_THEME,
    CHANGE_PRIMARY_THEME,
    REDIRECT,
    CLEAR_REDIRECT
} from "../_constants/action-types";

const initialState = {
    message: {},
    themeMode: "light",
    primaryTheme: "",
    redirectTo: undefined,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return { ...state, message: action.payload };

        case CLEAR_MESSAGE:
            return { ...state, message: {} }

        case CHANGE_THEME_MODE:
            const theme = state.theme === "light" ? "dark" : "light";
            window.localStorage.setItem("theme", theme);
            return { ...state, theme }

        case LOAD_THEME_MODE:
            const localMode = window.localStorage.getItem("theme");
            return { ...state, theme: localMode || "light" }

        case LOAD_PRIMARY_THEME:
            const localTheme = window.localStorage.getItem("primaryTheme");
            return { ...state, primaryTheme: localTheme || "light" }

        case CHANGE_PRIMARY_THEME:
            window.localStorage.setItem("primaryTheme", action.payload);
            return { ...state, primaryTheme: action.payload }

        case REDIRECT:
            return { ...state, redirectTo: action.payload }
        case CLEAR_REDIRECT:
            return { ...state, redirectTo: undefined };

        default:
            return state;
    }
};
