import { SETRANKS } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETRANKS: {
      return action.payload.rank;
    }

    default: {
      return state
    }
  }
}