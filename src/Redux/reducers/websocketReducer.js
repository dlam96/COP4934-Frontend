import { SETWEBSOCKET } from "../actionTypes.js";

export default function (state = null, action) {
  switch (action.type) {
    case SETWEBSOCKET: {
      return action.payload.ws;
    }

    default: {
      return state;
    }
  }
}
