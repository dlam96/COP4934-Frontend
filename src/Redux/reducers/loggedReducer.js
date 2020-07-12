import { LOGIN, LOGOUT } from "../actionTypes.js";

export default function loggedReducer(
  state = { logged: false, username: null },
  action
) {
  switch (action.type) {
    case LOGIN: {
      return {
        logged: true,
        username: action.payload.username,
      };
    }

    case LOGOUT: {
      return {
        logged: false,
        username: null,
      };
    }

    default: {
      return state;
    }
  }
}
