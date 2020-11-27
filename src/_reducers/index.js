import { combineReducers } from "redux";
import uiReducer from './uiReducer';
import authReducer from './authReducer';

export default combineReducers({
    ui: uiReducer,
    auth: authReducer
})