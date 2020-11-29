import { SETAIRMEN, EDITAIRMAN, APPROVEAIRMAN } from "../actionTypes.js";

export default function (state = null, action) {
  switch (action.type) {
    case SETAIRMEN: {
      return action.payload.airmen;
    }

    case EDITAIRMAN: {
      console.log("editting got obj:", action.payload);
      let newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i].account_uuid === action.payload.account_uuid) {
          newState[i] = { ...newState[i], ...action.payload.airman };
        }
      }
      return newState;
    }

    case APPROVEAIRMAN: {
      console.log("approving got obj:", action.payload);
      return [...state, action.payload.airman];
    }

    default: {
      return state;
    }
  }
}
