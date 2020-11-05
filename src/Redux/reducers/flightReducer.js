import { SETFLIGHTS, ADDFLIGHT, EDITFLIGHT, DELETEFLIGHT } from '../actionTypes.js';
import moment from "moment";


export default function (state = null, action) {
  switch (action.type) {
    case SETFLIGHTS: {
      return action.payload.flight;
    }

    case ADDFLIGHT: {
      return [...state, {...action.payload.flight, 
        start: moment(action.payload.flight.start).toDate(),
        end: moment(action.payload.flight.end).toDate() }
      ];
    }

    case EDITFLIGHT: {
      console.log("editting flight got obj:", action.payload);
      let newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].flight_uuid === action.payload.flight.flight_uuid) {
          //console.log("Founds it");
          //console.log("Old one", newState[i]);
          newState[i] = {...newState[i], ...action.payload.flight,
            start: action.payload.flight.start ? moment(action.payload.flight.start).toDate() : newState[i].start,
            end: action.payload.flight.end ? moment(action.payload.flight.end).toDate(): newState[i].end};
          console.log("New One", newState[i]);
        }
      }
      return newState;
    }

    case DELETEFLIGHT: {
      console.log("Deleting Reducer Flight");
      let newState = state.filter(element => element.flight_uuid !== action.payload.flight.flight_uuid);
      console.log("NewState Flights:", newState);
      return newState;
    }

    default: {
      return state;
    }
  }
}