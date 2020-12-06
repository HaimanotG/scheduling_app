import {
    FETCH_DEPARTMENTS,
    FETCH_HEADS,
    ADD_DEPARTMENT,
    DELETE_DEPARTMENT,
    UPDATE_DEPARTMENT,
    ADD_HEAD,
    UPDATE_HEAD,
    DELETE_HEAD
} from '../_constants/action-types';

const initialState = {
    loading: true,
    departments: [],
    heads: [],
    department: undefined,
    error: ""
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEPARTMENTS.REQUEST:
            return { ...state, loading: true };
        case FETCH_DEPARTMENTS.SUCCESS:
            return { ...state, departments: action.payload, loading: false };
        case FETCH_DEPARTMENTS.FAILURE:
            return { ...state, loading: false, error: action.payload }

        case ADD_DEPARTMENT.REQUEST:
            return { ...state, loading: true }
        case ADD_DEPARTMENT.SUCCESS:
        case ADD_DEPARTMENT.FAILURE:
            return { ...state, loading: false }

        case UPDATE_DEPARTMENT.REQUEST:
            return { ...state, loading: true };
        case UPDATE_DEPARTMENT.SUCCESS:
            return { ...state, loading: false }
        case UPDATE_DEPARTMENT.FAILURE:
            return { ...state, loading: false, error: action.payload }

        case DELETE_DEPARTMENT.REQUEST:
            return { ...state, loading: true }
        case DELETE_DEPARTMENT.SUCCESS:
        case DELETE_DEPARTMENT.FAILURE:
            return { ...state, loading: false }

        case FETCH_HEADS.REQUEST:
            return { ...state, loading: true };
        case FETCH_HEADS.SUCCESS:
            return { ...state, loading: false, heads: action.payload }
        case FETCH_HEADS.FAILURE:
            return { ...state, loading: false, error: action.payload };

        case ADD_HEAD.REQUEST:
            return { ...state, loading: true };
        case ADD_HEAD.SUCCESS:
            return { ...state, loading: false }
        case ADD_HEAD.FAILURE:
            return { ...state, loading: false, error: action.payload };

        case UPDATE_HEAD.REQUEST:
            return { ...state, loading: true };
        case UPDATE_HEAD.SUCCESS:
            return { ...state, loading: false }
        case UPDATE_HEAD.FAILURE:
            return { ...state, loading: false, error: action.payload };

        case DELETE_HEAD.REQUEST:
            return { ...state, loading: true };
        case DELETE_HEAD.SUCCESS:
            return { ...state, loading: false }
        case DELETE_HEAD.FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}