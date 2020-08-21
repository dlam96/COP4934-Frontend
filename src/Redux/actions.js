import { LOGIN, LOGOUT, ONDARKMODE, OFFDARKMODE } from "./actionTypes.js";

export const login = (loginObject) => ({
  type: LOGIN,
  payload: {
    accountUUID: loginObject.accountUUID,
    email: loginObject.email,
    role: loginObject.role,
    accessToken: loginObject.accessToken,
    accessTokenCreated: loginObject.accessTokenCreated,
    accessTokenExpiresIn: loginObject.accessTokenExpiresIn
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
