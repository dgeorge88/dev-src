import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//reducer
import rootReducer from "./reducers";

const initialState = {};

const middlewear = [thunk];

//developent redux removal
const enhancers = [];
const isDevelopment = process.env.NODE_ENV === "development";
if (
  isDevelopment &&
  typeof window !== "undefined" &&
  window.devToolsExtension
) {
  enhancers.push(window.devToolsExtension());
}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middlewear),
    ...enhancers
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
