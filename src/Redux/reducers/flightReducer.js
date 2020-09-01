import { SETFLIGHTS } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETFLIGHTS: {
      return action.payload.flight;
    }

    default: {
      return state
    }
  }
}