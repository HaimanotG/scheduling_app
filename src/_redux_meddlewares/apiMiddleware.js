import { API } from "../_constants/action-types";
import { authHeader } from '../_helpers';
import axiosInstance from '../_services/axios';
import { setMessage, redirect } from '../_actions/uiActions';

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
                response = await axiosInstance.get(url, { headers: await authHeader() });
                break;
            case "post":
                response = await axiosInstance.post(url, body, { headers: await authHeader() });
                if (url.includes("login")) {
                    response = {
                        data: {
                            sessionToken: response.headers['x-auth-token'],
                            ...response.data,
                        }
                    }
                }
                break;
            case "patch":
                response = await axiosInstance.patch(url, body, { headers: await authHeader() });
                break;
            case "delete":
                response = await axiosInstance.delete(url, { headers: await authHeader() });
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
                dispatch(redirect(action.payload.onSuccessRedirect));
            }
        } else {
            dispatch({ type: FAILURE, payload: { error: "Something went wrong!" } });
            if (action.payload.failureMessage) {
                dispatch(setMessage({ text: action.payload.failureMessage, type: "warning" }));
            }
            if (action.payload.onFailureRedirect) {
                dispatch(redirect(action.payload.onFailureRedirect));
            }
        }

    } catch (e) {
        const { error } = e.response.data;
        const { message } = error;

        dispatch({ type: FAILURE, payload: { error: message } });
        if (action.payload.failureMessage) {
            dispatch(setMessage({ text: message || action.payload.failureMessage, type: "warning" }));
        }
        if (action.payload.onFailureRedirect) {
            dispatch(redirect(action.payload.onFailureRedirect));
        }
    }
};
