import { SETAIRCRAFTS } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETAIRCRAFTS: {
      return action.payload.aircraft;
    }

    default: {
      return state
    }
  }
}