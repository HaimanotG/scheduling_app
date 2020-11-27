import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./_reducers";
const logMiddleware = ({ getState, dispatch }) => next => action => {
  console.log(`Action: ${action.type}`);
  next(action);
};
const middleware = [thunk, logMiddleware];
const store = createStore(
  rootReducer,
  {},
  applyMiddleware(...middleware)
  // compose(
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // )
);

export default store;
