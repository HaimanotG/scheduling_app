import { API } from "../_constants/action-types";
import { authHeader, history } from '../_helpers';
import axios from '../_services/axios';
import { setMessage } from '../_actions/uiActions';

export default ({ getState, dispatch }) => next => async action => {
    if (action.type !== API) {
        return next(action)
    };

    const { REQUEST, SUCCESS, FAILURE } = action.payload.next;
    dispatch({ type: REQUEST });

    let response;
    try {
        const { method, url, body } = action.payload;
        switch (method) {
            case "get":
                response = await axios.get(url, { headers: await authHeader() });
                break;
            case "post":
                response = await axios.post(url, body, { headers: await authHeader() });
                if (url.includes("login")) {
                    response = {
                        data: {
                            sessionToken: response.headers['x-auth-token'],
                            username: response.data.username,
                            role: response.data.role
                        }
                    }
                }
                break;
            case "patch":
                response = await axios.patch(url, body, { headers: await authHeader() });
                break;
            case "delete":
                response = await axios.delete(url, { headers: await authHeader() });
                break;
            default:
                break;
        }

        if (response.data) {
            dispatch({ type: SUCCESS, payload: response.data });
            
            if (action.payload.successMessage) {
                dispatch(setMessage({ text: action.payload.successMessage, type: "success" }));
            }

            if (action.payload.onSuccessRedirect) {
                history.push(action.payload.onSuccessRedirect);
            }
        } else {
            dispatch({ type: FAILURE, payload: { error: "Something went wrong!" } });
            if (action.payload.failureMessage) {
                dispatch(setMessage({ text: action.payload.failureMessage, type: "warning" }));
            }
        }

    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message)
            || e.message || e.toString();

        dispatch({ type: FAILURE, payload: { error: message } });

        if (action.payload.failureMessage) {
            dispatch(setMessage({ text: action.payload.failureMessage, type: "warning" }));
        }
    }
};
