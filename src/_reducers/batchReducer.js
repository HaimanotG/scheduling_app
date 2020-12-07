import {
    FETCH_BATCHES,
    ADD_BATCH,
    DELETE_BATCH,
    UPDATE_BATCH
} from "../_constants/action-types";

const initialState = {
    batches: [],
    loading: false,
    error: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BATCHES.REQUEST:
        case ADD_BATCH.REQUEST:
        case DELETE_BATCH.REQUEST:
        case UPDATE_BATCH.REQUEST:
            return { ...state, loading: true };

        case ADD_BATCH.SUCCESS:
        case DELETE_BATCH.SUCCESS:
        case UPDATE_BATCH.SUCCESS:
            return { ...state, loading: false };
            
        case FETCH_BATCHES.SUCCESS:
            return { ...state, loading: false, batches: action.payload }

        case ADD_BATCH.FAILURE:
        case DELETE_BATCH.FAILURE:
        case UPDATE_BATCH.FAILURE:
        case FETCH_BATCHES.FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}