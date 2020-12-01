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
      let newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].location_uuid === action.payload.location.location_uuid) {
          newState[i] = {...newState[i], ...action.payload.location};
        }
      }
      return newState;
    }

    case DELETELOCATION: {
      let newState = state.filter(element => element.location_uuid !== action.payload.location.location_uuid);
      return newState;
    }

    default: {
      return state
    }
  }
}