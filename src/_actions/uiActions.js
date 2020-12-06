import {
    SET_MESSAGE,
    CLEAR_MESSAGE,
    LOAD_THEME_MODE,
    CHANGE_THEME_MODE,
    LOAD_PRIMARY_THEME,
    CHANGE_PRIMARY_THEME
} from "../_constants/action-types";

export const setMessage = ({ text, type }) => ({
    type: SET_MESSAGE,
    payload: { text, type }
});

export const clearMessage = () => ({
    type: CLEAR_MESSAGE
});

export const changeTheme = theme => ({
    type: CHANGE_THEME_MODE,
    payload: theme
})

export const loadTheme = () => ({
    type: LOAD_THEME_MODE
})

export const changePrimaryTheme = theme => ({
    type: CHANGE_PRIMARY_THEME,
    payload: theme
})

export const loadPrimaryTheme = () => ({
    type: LOAD_PRIMARY_THEME
})