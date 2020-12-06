import { createStore, applyMiddleware } from "redux";
import { apiMiddleware, logMiddleware } from "./_redux_meddlewares";

import rootReducer from "./_reducers";

const middleware = [logMiddleware, apiMiddleware];
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

// compose(
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
