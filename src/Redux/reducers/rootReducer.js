import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer";
import loggedReducer from "./loggedReducer";
import signupReducer from "./signupReducer";

export default combineReducers({
  darkModeReducer,
  loggedReducer,
  signupReducer,
});
