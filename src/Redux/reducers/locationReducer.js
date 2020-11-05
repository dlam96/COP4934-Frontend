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
      console.log("editting got obj:", action.payload);
      let newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].location_uuid === action.payload.location.location_uuid) {
          newState[i] = {...newState[i], ...action.payload.location};
        }
      }
      return newState;
    }

    case DELETELOCATION: {
      console.log("Deleting Reducer");
      let newState = state.filter(element => element.location_uuid !== action.payload.location.location_uuid);
      console.log("NewState:", newState);
      return newState;
    }

    default: {
      return state
    }
  }
}