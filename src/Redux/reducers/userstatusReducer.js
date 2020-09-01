import { SETUSERSTATUS } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETUSERSTATUS: {
      return action.payload.userstatus;
    }

    default: {
      return state
    }
  }
}