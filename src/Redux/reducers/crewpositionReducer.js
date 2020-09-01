import { SETCREWPOSITION } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETCREWPOSITION: {
      return action.payload.crewposition;
    }

    default: {
      return state
    }
  }
}