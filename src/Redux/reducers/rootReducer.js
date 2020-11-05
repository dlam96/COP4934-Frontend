import { combineReducers } from "redux";
import darkModeReducer from "./darkModeReducer.js";
import loggedReducer from "./loggedReducer.js";

import airmenReducer from "./airmenReducer.js";
import aircraftmodelReducer from "./aircraftmodelReducer.js";
import locationReducer from "./locationReducer.js";
import aircraftReducer from "./aircraftReducer.js";
import flightReducer from "./flightReducer.js";
import crewpositionReducer from "./crewpositionReducer.js";
import rankReducer from "./rankReducer.js";
import aircraftstatusReducer from "./aircraftstatusReducer.js";
import userstatusReducer from "./userstatusReducer.js";
import onlineReducer from "./onlineReducer";


export default combineReducers({
  darkModeReducer,
  loggedReducer,
  airmenReducer,
  aircraftmodelReducer,
  locationReducer,
  aircraftReducer,
  flightReducer,
  crewpositionReducer,
  rankReducer,
  aircraftstatusReducer,
  userstatusReducer,
  onlineReducer,
});
