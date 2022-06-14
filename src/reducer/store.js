import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import coinReducer from "./reducer";

const store = createStore(coinReducer, compose(applyMiddleware(thunk)));

export default store;