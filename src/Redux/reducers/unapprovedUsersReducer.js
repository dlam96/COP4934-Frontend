import { SETUNAPPROVEDUSERS } from '../actionTypes.js';

export default function (state = null, action) {
  switch (action.type) {
    case SETUNAPPROVEDUSERS: {
      return action.payload.user;
    }

    default: {
      return state
    }
  }
}