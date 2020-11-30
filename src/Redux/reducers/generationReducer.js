import { SETSCHEDULE } from "../actionTypes.js";
import moment from "moment";

export default function (state = null, action) {
  switch (action.type) {
    case SETSCHEDULE: {
      console.log("Generated schedule", action.payload);
      return action.payload.schedule;
    }

    default: {
      return state;
    }
  }
}
