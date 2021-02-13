import { createStore, applyMiddleware, compose } from "redux";
import { apiMiddleware } from "./_redux_meddlewares";

import rootReducer from "./_reducers";

const middleware = [apiMiddleware];
const store = createStore(rootReducer, compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;