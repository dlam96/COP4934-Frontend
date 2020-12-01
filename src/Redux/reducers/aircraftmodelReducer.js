import { SETAIRCRAFTMODELS, ADDAIRCRAFTMODEL, EDITAIRCRAFTMODEL, DELETEAIRCRAFTMODEL } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETAIRCRAFTMODELS: {
      return action.payload.aircraftmodel;
    }

    case ADDAIRCRAFTMODEL: {
      let newAircraftModels = Array.from(state);
      newAircraftModels.push(action.payload.aircraftModel);
      return newAircraftModels;
      break;
    }

    case EDITAIRCRAFTMODEL: {
      let newAircraftModels = Array.from(state);
      for (let i = 0; i < newAircraftModels.length; i++) {
        if (newAircraftModels[i].model_uuid === action.payload.aircraft.model_uuid) {
          newAircraftModels[i] = {...newAircraftModels[i], ...action.payload.aircraftModel};
        }
      }
      return newAircraftModels;
      break;
    }

    case DELETEAIRCRAFTMODEL: {
      let newAircraftModels = state.filter(element => element.model_uuid !== action.payload.aircraftModel.model_uuid);
      return newAircraftModels;
      break;
    }

    default: {
      return state
    }
  }
}