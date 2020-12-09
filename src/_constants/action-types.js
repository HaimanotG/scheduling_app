const asyncActionType = type => ({
    REQUEST: `${type}_REQUEST`,
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`
});

export const LOGIN = asyncActionType('LOGIN');
export const CHECK_USER = asyncActionType('CHECK_USER');
export const CHANGE_PASSWORD = asyncActionType('CHANGE_PASSWORD');
export const CHANGE_PROFILE = asyncActionType('CHANGE_PROFILE');

export const FETCH_DEPARTMENTS = asyncActionType("FETCH_DEPARTMENTS");
export const ADD_DEPARTMENT = asyncActionType("ADD_DEPARTMENT");
export const UPDATE_DEPARTMENT = asyncActionType("UPDATE_DEPARTMENT");
export const DELETE_DEPARTMENT = asyncActionType("DELETE_DEPARTMENT");

export const FETCH_HEADS = asyncActionType("FETCH_HEADS");
export const ADD_HEAD = asyncActionType('ADD_HEAD');
export const UPDATE_HEAD = asyncActionType('UPDATE_HEAD');
export const DELETE_HEAD = asyncActionType('DELETE_HEAD');

export const FETCH_TEACHERS = asyncActionType("FETCH_TEACHERS");
export const ADD_TEACHER = asyncActionType("ADD_TEACHER");
export const UPDATE_TEACHER = asyncActionType("UPDATE_TEACHER");
export const DELETE_TEACHER = asyncActionType("DELETE_TEACHER");

export const FETCH_ROOMS = asyncActionType("FETCH_ROOMS");
export const ADD_ROOM = asyncActionType("ADD_ROOM");
export const UPDATE_ROOM = asyncActionType("UPDATE_ROOM");
export const DELETE_ROOM = asyncActionType("DELETE_ROOM");

export const FETCH_BATCHES = asyncActionType("FETCH_BATCHES");
export const ADD_BATCH = asyncActionType("ADD_BATCH");
export const UPDATE_BATCH = asyncActionType("UPDATE_BATCH");
export const DELETE_BATCH = asyncActionType("DELETE_BATCH");

export const API = "API";
export const LOGOUT = "LOGOUT";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const CHANGE_THEME_MODE = "CHANGE_THEME_MODE";
export const LOAD_THEME_MODE = "LOAD_THEME_MODE";
export const LOAD_PRIMARY_THEME = "LOAD_PRIMARY_THEME";
export const CHANGE_PRIMARY_THEME = "CHANGE_PRIMARY_THEME";

export const REDIRECT = "REDIRECT";
export const CLEAR_REDIRECT = "CLEAR_REDIRECT";