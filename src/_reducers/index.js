import { combineReducers } from "redux";
import ui from './uiReducer';
import auth from './authReducer';
import admin from './adminReducer';
import teacher from './teacherReducer';
import room from './roomReducer';
import batch from './batchReducer';
import course from './courseReducer';

export default combineReducers({
    ui,
    auth,
    admin,
    teacher,
    room,
    batch,
    course,
})