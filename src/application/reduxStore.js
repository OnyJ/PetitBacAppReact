import { createStore, combineReducers } from "redux";
import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import userAuthReducer from "./../authentication/redux/userAuthReducer";
import scoreReducer from "../scoreReducer";

const rootReducer = combineReducers({
  auth: userAuthReducer,
  score: scoreReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => console.log(store.getState()));

export default store;
