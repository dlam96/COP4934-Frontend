import { SIGNUP, SIGNUP_APPROVED } from "../actionTypes.js";

export default function signupReducer( 
  state = { username: null, password: null }, action 
) {
    switch(action.type) {
      case SIGNUP: {
        return {
          username: action.payload.username,
          password: action.payload.password,
          approved: false
        }
      }

      // For admin to approve 
      case SIGNUP_APPROVED: {
        return {
          approved: true,
        }
      }

      default:
        return state;
    }
  }