import { COMMITSCHEDULE } from "../actionTypes.js";

export default function (state = null, action) {
  switch (action.type) {
    case COMMITSCHEDULE: {
      return action.payload.flights;
    }

    default: {
      return state;
    }
  }
}
