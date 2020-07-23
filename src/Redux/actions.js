import { LOGIN, LOGOUT, SIGNUP, ONDARKMODE, OFFDARKMODE } from "./actionTypes.js";

export const login = (username) => ({
  type: LOGIN,
  payload: {
    username: username,
  },
});

export const logout = () => ({  
  type: LOGOUT,
});

export const signup = ( { email, password } ) => ({
  type: SIGNUP,
  payload: {
    username: email,
    password,
  }
});

export const onDarkMode = () => ({
  type: ONDARKMODE,
});

export const offDarkMode = () => ({
  type: OFFDARKMODE,
});
