import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { loadState } from "../LocalCache/localStorage.js";

let localCache = loadState();
let store = createStore(rootReducer);

console.log("Loading Cache!");
console.log(localCache);
if (localCache !== null) {
  store = createStore(rootReducer, localCache);
}
export default store;
