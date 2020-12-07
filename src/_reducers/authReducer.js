import { localStore, history } from "../_helpers";
import { LOGIN, CHECK_USER, LOGOUT } from "../_constants/action-types";

const initialState = {
    isLoading: false,
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN.REQUEST:
            return { ...state, isLoading: true }
        case LOGIN.FAILURE:
            return { ...state, isLoading: false };
        case LOGIN.SUCCESS:
            localStore.set("user", action.payload);
            return { ...state, isLoading: false, user: action.payload };

        case CHECK_USER.REQUEST:
            return { ...state, isLoading: true };
        case CHECK_USER.SUCCESS:
            const user = localStore.get("user");
            if (user.role === 'admin' && state.isLoading) {
                history.push("/admin")
            } else if (user.role === 'head' && state.isLoading) {
                history.push("/head/room/add");
            };
            return { ...state, isLoading: false, user };
        case CHECK_USER.FAILURE:
        case LOGOUT:
            localStore.remove("user");
            return { ...state, isLoading: false, user: {} };
        default:
            return state;
    }
};
