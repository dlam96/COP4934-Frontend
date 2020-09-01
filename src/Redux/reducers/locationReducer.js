import { SETLOCATIONS } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETLOCATIONS: {
      return action.payload.location;
    }

    default: {
      return state
    }
  }
}