import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

// create store for application;
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
