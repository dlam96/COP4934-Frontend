import { SETAIRCRAFTSTATUS } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETAIRCRAFTSTATUS: {
      return action.payload.aircraftstatus;
    }

    default: {
      return state
    }
  }
}