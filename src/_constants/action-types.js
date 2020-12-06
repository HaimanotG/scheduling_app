const asyncActionType = type => ({
    REQUEST: `${type}_REQUEST`,
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`
});

export const LOGIN = asyncActionType('LOGIN');
export const CHECK_USER = asyncActionType('CHECK_USER');
export const FETCH_DEPARTMENTS = asyncActionType("FETCH_DEPARTMENTS");
export const FETCH_HEADS = asyncActionType("FETCH_HEADS");
export const ADD_DEPARTMENT = asyncActionType("ADD_DEPARTMENT");
export const UPDATE_DEPARTMENT = asyncActionType("UPDATE_DEPARTMENT");
export const DELETE_DEPARTMENT = asyncActionType("DELETE_DEPARTMENT");

export const ADD_HEAD = asyncActionType('ADD_HEAD');
export const UPDATE_HEAD = asyncActionType('UPDATE_HEAD');
export const DELETE_HEAD = asyncActionType('DELETE_HEAD');

export const API = "API";
export const LOGOUT = "LOGOUT";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const CHANGE_THEME_MODE = "CHANGE_THEME_MODE";
export const LOAD_THEME_MODE = "LOAD_THEME_MODE";
export const LOAD_PRIMARY_THEME = "LOAD_PRIMARY_THEME";
export const CHANGE_PRIMARY_THEME = "CHANGE_PRIMARY_THEME";