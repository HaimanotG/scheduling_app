import {
    FETCH_COURSES,
    ADD_COURSE,
    DELETE_COURSE,
    UPDATE_COURSE,
    FETCH_SEMESTERS
} from "../_constants/action-types";

const initialState = {
    courses: [],
    semesters: [],
    loading: false,
    error: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COURSES.REQUEST:
        case ADD_COURSE.REQUEST:
        case DELETE_COURSE.REQUEST:
        case UPDATE_COURSE.REQUEST:
        case FETCH_SEMESTERS:
            return { ...state, loading: true };

        case ADD_COURSE.SUCCESS:
        case DELETE_COURSE.SUCCESS:
        case UPDATE_COURSE.SUCCESS:
            return { ...state, loading: false };

        case FETCH_COURSES.SUCCESS:
            return { ...state, loading: false, courses: action.payload }

        case FETCH_SEMESTERS.SUCCESS:
            return { ...state, loading: false, semesters: action.payload };

        case ADD_COURSE.FAILURE:
        case DELETE_COURSE.FAILURE:
        case UPDATE_COURSE.FAILURE:
        case FETCH_COURSES.FAILURE: 
        case FETCH_SEMESTERS.FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}