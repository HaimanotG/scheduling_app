import { SET_ALERT, CLOSE_ALERT } from "../_constants";
export const setAlert = ({ message, type }) => ({
  type: SET_ALERT,
  payload: {
    message,
    type
  }
});

export const closeAlert = () => ({
  type: CLOSE_ALERT
});
