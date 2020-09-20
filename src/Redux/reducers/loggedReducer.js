import { LOGIN, LOGOUT, GOTINITIALESSENTIALREQUEST } from "../actionTypes.js";

export default function loggedReducer(
  state = { logged: false, username: null, role: null, accessToken: null, accessTokenCreated: null,
    accessTokenExpiresIn: null, gotEssentialRequest: false },
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
        accessTokenExpiresIn: action.payload.accessTokenExpiresIn,
        gotEssentialRequest: false
      };
    }

    case LOGOUT: {
      return {
        logged: false,
        username: null,
        role: null,
        accessToken: null,
        accessTokenCreated: null,
        accessTokenExpiresIn: null,
        gotEssentialRequest: false
      };
    }

    case GOTINITIALESSENTIALREQUEST: {
      return {
        ...state, gotEssentialRequest: true
      }
    }

    default: {
      return state;
    }
  }
}

 

