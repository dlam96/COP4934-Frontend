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
        if (newState[i].account_uuid === action.payload.airman.account_uuid) {
          console.log("found user to edit");
          newState[i] = { ...newState[i], ...action.payload.airman };
          break;
        }
      }
      return newState;
    }

    case APPROVEAIRMAN: {
      console.log("approving got obj:", action.payload);
      if (!action.payload.airman.airmen.length) {
        return [...state, action.payload.airman.airmen];
      } else {
        return state.concat(action.payload.airman.airmen);
      }
    }

    default: {
      return state;
    }
  }
}
