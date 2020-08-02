import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer";
import loggedReducer from "./loggedReducer";

export default combineReducers({
  darkModeReducer,
  loggedReducer,
});
