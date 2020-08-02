import { LOGIN, LOGOUT, ONDARKMODE, OFFDARKMODE } from "./actionTypes.js";

export const login = (username) => ({
  type: LOGIN,
  payload: {
    username: username,
  },
});

export const logout = () => ({  
  type: LOGOUT,
});


export const onDarkMode = () => ({
  type: ONDARKMODE,
});

export const offDarkMode = () => ({
  type: OFFDARKMODE,
});
