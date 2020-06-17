import { createStore } from "redux";
import loggedReducer from "./reducers/loggedReducer.js";
import { loadState } from "../LocalCache/localStorage.js";

let localCache = loadState();
console.log("Loading Cache!");
console.log(localCache);

export default createStore(loggedReducer, localCache);
