import { SETAIRMEN, EDITAIRMAN, APPROVEAIRMAN } from "../actionTypes.js";

export default function (state = null, action) {
  switch (action.type) {
    case SETAIRMEN: {
      return {
        users: [...action.payload.airmen],
        pending: [...state.pending]
      }
    }

    case SETPENDING: {
      return {
        users: Array.from(state.users),
        pending; [...action.payload.pending]
      }
    }

    case EDITAIRMAN: {
      console.log("editting got obj:", action.payload);
      let newState = {};
      newState.users = Array.from(state.users);
      newState.pending = Array.from(state.pending);
      for (let i = 0; i < newState.users.length; i++) {
        if (newState.users[i].account_uuid === action.payload.airman.account_uuid) {
          console.log("found user to edit");
          newState.users[i] = Object.assign(newState.users[i], action.payload.airman);
          break;
        }
      }
      return newState;
    }

    case APPROVEAIRMAN: {
      console.log("approving got obj:", action.payload);
      let newState = {};
      newState.users = Array.from(state.users);
      newState.pending = Array.from(state.pending);

      if (!action.payload.airman.airmen.length) {
        console.log("Should not reach this spot");
        newState.users.push(action.payload.airman.airmen);
      } else {
        newState.users.concat(action.payload.airman.airmen);
        let removePendingUsers = [];
        for (const airman of action.payload.airman.airmen) {
          removePendingUsers.push(airman.account_uuid);
        }
        newState.pending = newState.pending.filter((item) => !removePendingUsers.includes(item.account_uuid));
      }
      return newState;
    }

    default: {
      return state;
    }
  }
}
