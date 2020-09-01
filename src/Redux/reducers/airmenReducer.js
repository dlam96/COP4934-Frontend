import { SETAIRMEN } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETAIRMEN: {
      return action.payload.airmen;
    }

    default: {
      return state
    }
  }
}