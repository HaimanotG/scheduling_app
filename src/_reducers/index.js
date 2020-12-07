import { combineReducers } from "redux";
import ui from './uiReducer';
import auth from './authReducer';
import admin from './adminReducer';
import teacher from './teacherReducer';
import room from './roomReducer';

export default combineReducers({
    ui,
    auth,
    admin,
    teacher,
    room,
})