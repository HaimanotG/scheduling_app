import {
    FETCH_TEACHERS,
    ADD_TEACHER,
    DELETE_TEACHER,
    UPDATE_TEACHER
} from "../_constants/action-types";

const initialState = {
    teachers: [],
    loading: false,
    error: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TEACHERS.REQUEST:
        case ADD_TEACHER.REQUEST:
        case DELETE_TEACHER.REQUEST:
        case UPDATE_TEACHER.REQUEST:
            return { ...state, loading: true };

        case ADD_TEACHER.SUCCESS:
        case DELETE_TEACHER.SUCCESS:
        case UPDATE_TEACHER.SUCCESS:
            return { ...state, loading: false };
            
        case FETCH_TEACHERS.SUCCESS:
            return { ...state, loading: false, teachers: action.payload }

        case ADD_TEACHER.FAILURE:
        case DELETE_TEACHER.FAILURE:
        case UPDATE_TEACHER.FAILURE:
        case FETCH_TEACHERS.FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}