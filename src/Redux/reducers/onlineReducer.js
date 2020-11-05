import { SETONLINE } from "../actionTypes.js";

export default function (state = null, action) {
  switch (action.type) {
    case SETONLINE: {
      console.log("online reducer", action.payload.online);
      return action.payload.online;
    }

    default: {
      return state;
    }
  }
}
