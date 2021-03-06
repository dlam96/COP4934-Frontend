import { LOGIN, LOGOUT } from "../actionTypes.js";
import { WebSocketFrame } from "../../Components/WebSocket/WebSocket.js";

export default function loggedReducer(
  state = {
    logged: false,
    username: null,
    role: null,
    first_name: null,
    last_name: null,
    accessToken: null,
    accessTokenCreated: null,
    accessTokenExpiresIn: null,
    gotEssentialRequest: false,
  },
  action
) {
  switch (action.type) {
    case LOGIN: {
      return {
        logged: true,
        accountUUID: action.payload.accountUUID,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        role: action.payload.role,
        accessToken: action.payload.accessToken,
        accessTokenCreated: action.payload.accessTokenCreated,
        accessTokenExpiresIn: action.payload.accessTokenExpiresIn,
        gotEssentialRequest: false,
      };
    }

    case LOGOUT: {
      WebSocketFrame.closeWebsocket();
      return {
        logged: false,
        accountUUID: null,
        username: null,
        role: null,
        first_name: null,
        last_name: null,
        accessToken: null,
        accessTokenCreated: null,
        accessTokenExpiresIn: null,
        gotEssentialRequest: false,
      };
    }

    default: {
      return state;
    }
  }
}
