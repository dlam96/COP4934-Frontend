import { SETAIRCRAFTS, EDITAIRCRAFT, ADDAIRCRAFT, DELETEAIRCRAFT } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETAIRCRAFTS: {
      return action.payload.aircraft;
      break;
    }

    case ADDAIRCRAFT: {
      let newAircrafts = Array.from(state);
      newAircrafts.push(action.payload.aircraft);
      return newAircrafts;
      break;
    }

    case EDITAIRCRAFT: {
      let newAircrafts = Array.from(state);
      for (let i = 0; i < newAircrafts.length; i++) {
        if (newAircrafts[i].aircraft_uuid === action.payload.aircraft.aircraft_uuid) {
          newAircrafts[i] = {...newAircrafts[i], ...action.payload.aircraft};
        }
      }
      return newAircrafts;
      break;
    }

    case DELETEAIRCRAFT: {
      let newAircrafts = state.filter(element => element.aircraft_uuid !== action.payload.aircraft.aircraft_uuid);
      return newAircrafts;
      break;
    }

    default: {
      return state
    }
  }
}