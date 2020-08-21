import { LOGIN, LOGOUT } from "../actionTypes.js";

export default function loggedReducer(
  state = { logged: false, username: null, role: null, token: null },
  action
) {
  switch (action.type) {
    case LOGIN: {
      return {
        logged: true,
        accountUUID: action.payload.accountUUID,
        email: action.payload.email,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
        accessTokenCreated: action.payload.accessTokenCreated,
        accessTokenExpiresIn: action.payload.accessTokenExpiresIn
      };
    }

    case LOGOUT: {
      return {
        logged: false,
        username: null,
        role: null,
        token: null
      };
    }

    default: {
      return state;
    }
  }
}

 

