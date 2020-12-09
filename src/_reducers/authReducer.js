import { localStore } from "../_helpers";
import { LOGIN, CHECK_USER, LOGOUT, CHANGE_PASSWORD } from "../_constants/action-types";

const initialState = {
    loading: false,
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN.REQUEST:
        case CHECK_USER.REQUEST:
        case CHANGE_PASSWORD.REQUEST:
            return { ...state, loading: true }

        case LOGIN.FAILURE:
        case CHANGE_PASSWORD.FAILURE:
            return { ...state, loading: false };

        case LOGIN.SUCCESS:
            localStore.set("user", action.payload);
            return { ...state, loading: false, user: action.payload };

        case CHECK_USER.SUCCESS:
            const user = localStore.get("user");
            return { ...state, loading: false, user };
            
        case CHECK_USER.FAILURE:
        case LOGOUT:
            localStore.remove("user");
            return { ...state, loading: false, user: {} };

        case CHANGE_PASSWORD.SUCCESS:
            return { ...state, loading: false, }
        default:
            return state;
    }
};
