import commentsReducer from "./comment-reducer";
import {applyMiddleware, combineReducers} from "redux";
import thunk from "redux-thunk";

const {createStore} = require("redux");

let reducers = combineReducers({
    commentsPage: commentsReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;