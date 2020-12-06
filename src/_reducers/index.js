import { combineReducers } from "redux";
import ui from './uiReducer';
import auth from './authReducer';
import admin from './adminReducer';

export default combineReducers({
    ui,
    auth,
    admin,
})