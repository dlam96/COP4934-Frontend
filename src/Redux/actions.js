import { LOGIN, LOGOUT, ONDARKMODE, OFFDARKMODE,
  SETAIRMEN, SETAIRCRAFTMODELS, SETLOCATIONS, SETAIRCRAFTS,
  SETFLIGHTS, SETCREWPOSITION, SETRANKS, SETAIRCRAFTSTATUS, SETUSERSTATUS, GOTINITIALESSENTIALREQUEST
  } from "./actionTypes.js";


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

export const gotEssentialPayload = () => ({
  type: GOTINITIALESSENTIALREQUEST,
})

export const onDarkMode = () => ({
  type: ONDARKMODE,
});

export const offDarkMode = () => ({
  type: OFFDARKMODE,
});

export const setAirmen = (airmen) => ({
  type: SETAIRMEN,
  payload: {
    airmen: airmen
  }
});

export const setAircraftModels = (aircraftModels) => ({
  type: SETAIRCRAFTMODELS,
  payload: {
    aircraftmodel: aircraftModels
  }
});

export const setLocations = (locations) => ({
  type: SETLOCATIONS,
  payload: {
    location: locations
  }
});

export const setAircrafts = (aircrafts) => ({
  type: SETAIRCRAFTS,
  payload: {
    aircraft: aircrafts
  }
});

export const setFlights = (flights) => ({
  type: SETFLIGHTS,
  payload: {
    flight: flights
  }
});

export const setCrewPostions = (crewPositions) => ({
  type: SETCREWPOSITION,
  payload: {
    crewposition: crewPositions
  }
});


export const setRanks = (ranks) => ({
  type: SETRANKS,
  payload: {
    rank: ranks
  }
});

export const setAircraftStatus = (aircraftStatus) => ({
  type: SETAIRCRAFTSTATUS,
  payload: {
    aircraftstatus: aircraftStatus
  }
});

export const setUserStatus = (userStatus) => ({
  type: SETUSERSTATUS,
  payload: {
    userstatus: userStatus
  }
});

