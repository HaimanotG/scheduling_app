import {
    FETCH_ROOMS,
    ADD_ROOM,
    DELETE_ROOM,
    UPDATE_ROOM
} from "../_constants/action-types";

const initialState = {
    rooms: [],
    loading: false,
    error: "",
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ROOMS.REQUEST:
        case ADD_ROOM.REQUEST:
        case DELETE_ROOM.REQUEST:
        case UPDATE_ROOM.REQUEST:
            return { ...state, loading: true };

        case ADD_ROOM.SUCCESS:
        case DELETE_ROOM.SUCCESS:
        case UPDATE_ROOM.SUCCESS:
            return { ...state, loading: false };
            
        case FETCH_ROOMS.SUCCESS:
            return { ...state, loading: false, rooms: action.payload }

        case ADD_ROOM.FAILURE:
        case DELETE_ROOM.FAILURE:
        case UPDATE_ROOM.FAILURE:
        case FETCH_ROOMS.FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}