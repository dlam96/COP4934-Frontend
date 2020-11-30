import { SETAIRMEN, EDITAIRMAN, APPROVEAIRMAN, SETPENDING } from "../actionTypes.js";

export default function (state = null, action) {
  switch (action.type) {
    case SETAIRMEN: {
      return {
        users: [...action.payload.airmen],
        pending: state ? state.pending ? Array.from(state.pending) : [] : [],
      }
      break;
    }

    case SETPENDING: {
      return {
        users: state ? state.pending ? Array.from(state.users) : [] : [],
        pending: [...action.payload.pending]
      }
      break;
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
      break;
    }

    case APPROVEAIRMAN: {
      console.log("approving got obj:", action.payload);
      let newState = {};
      console.log("State fucking now:", state.users);
      newState.pending = Array.from(state.pending);
      newState.users = Array.from(state.users);
      //newState.users = [...newState.users, ...action.payload.airman.airmen];
      console.log("newState.users after change", newState.users);
      let removePendingUsers = [];
      for (const airman of action.payload.airman.airmen) {
        removePendingUsers.push(airman.account_uuid);
      }
      newState.pending = newState.pending.filter((item) => !removePendingUsers.includes(item.account_uuid));
      console.log("Got here wtf22222222!!!");
      return newState;
      break;
    }

    default: {
      return state;
      break;
    }
  }
}
