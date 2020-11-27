import { SET_ALERT, CLOSE_ALERT } from "../_constants";

const initialState = {
  alert: {},
  theme: {
    name: "light"
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      const { message, type } = action.payload;
      return {
        ...state,
        alert: {
          message,
          type
        }
      };
    case CLOSE_ALERT:
      return { ...state, alert: {} };

    default:
      return state;
  }
};
