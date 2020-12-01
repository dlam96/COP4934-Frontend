import { setMetaPositions } from '../actions.js';
import { SETMETAPOSITIONS } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETMETAPOSITIONS: {
      return action.payload.metaPositions;
    }

    default: {
      return state
    }
  }
}