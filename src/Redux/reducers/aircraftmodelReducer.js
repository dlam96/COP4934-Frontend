import { SETAIRCRAFTMODELS } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETAIRCRAFTMODELS: {
      return action.payload.aircraftmodel;
    }

    default: {
      return state
    }
  }
}