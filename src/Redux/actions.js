import { LOGIN, LOGOUT } from "./actionTypes.js";

export const login = ( username ) => ({
  type: LOGIN,
  payload: {
    username: username
  }
});

export const logout = () => ({
  type: LOGOUT
})