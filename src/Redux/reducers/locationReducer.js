import { SETLOCATIONS, ADDLOCATION, EDITLOCATION, DELETELOCATION } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETLOCATIONS: {
      return action.payload.locations;
    }

    case ADDLOCATION: {
      return [...state, action.payload.location];
    }

    case EDITLOCATION: {
      for (let i = 0; i < state.length; i++) {
        if (state[i].location_uuid === action.payload.location_uuid) {
          state[i] = {...state[i], ...action.payload.location};
        }
      }
      return state;
    }

    case DELETELOCATION: {
      return state.filter(element => element.location_uuid !== action.payload.location_uuid);
    }

    default: {
      return state
    }
  }
}