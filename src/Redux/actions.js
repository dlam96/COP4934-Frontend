import {
  LOGIN,
  LOGOUT,
  ONDARKMODE,
  OFFDARKMODE,
  SETAIRMEN,
  SETAIRCRAFTMODELS,
  SETLOCATIONS,
  SETAIRCRAFTS,
  SETFLIGHTS,
  SETCREWPOSITION,
  SETRANKS,
  SETAIRCRAFTSTATUS,
  SETUSERSTATUS,
  GOTINITIALESSENTIALREQUEST,
  ADDLOCATION,
  EDITLOCATION,
  DELETELOCATION,
  ADDFLIGHT,
  EDITFLIGHT,
  DELETEFLIGHT,
  SETONLINE,
} from "./actionTypes.js";

export const login = (loginObject) => ({
  type: LOGIN,
  payload: {
    accountUUID: loginObject.accountUUID,
    email: loginObject.email,
    first_name: loginObject.first_name,
    last_name: loginObject.last_name,
    role: loginObject.role,
    accessToken: loginObject.accessToken,
    accessTokenCreated: loginObject.accessTokenCreated,
    accessTokenExpiresIn: loginObject.accessTokenExpiresIn,
  },
});

export const logout = () => ({
  type: LOGOUT,
});

export const gotEssentialPayload = () => ({
  type: GOTINITIALESSENTIALREQUEST,
});

export const onDarkMode = () => ({
  type: ONDARKMODE,
});

export const offDarkMode = () => ({
  type: OFFDARKMODE,
});

export const setAirmen = (airmen) => ({
  type: SETAIRMEN,
  payload: {
    airmen: airmen,
  },
});

export const setAircraftModels = (aircraftModels) => ({
  type: SETAIRCRAFTMODELS,
  payload: {
    aircraftmodel: aircraftModels,
  },
});

export const setAircrafts = (aircrafts) => ({
  type: SETAIRCRAFTS,
  payload: {
    aircraft: aircrafts,
  },
});

export const setCrewPostions = (crewPositions) => ({
  type: SETCREWPOSITION,
  payload: {
    crewposition: crewPositions,
  },
});

export const setRanks = (ranks) => ({
  type: SETRANKS,
  payload: {
    rank: ranks,
  },
});

export const setAircraftStatus = (aircraftStatus) => ({
  type: SETAIRCRAFTSTATUS,
  payload: {
    aircraftstatus: aircraftStatus,
  },
});

export const setUserStatus = (userStatus) => ({
  type: SETUSERSTATUS,
  payload: {
    userstatus: userStatus,
  },
});

// Location Redux Actions
export const setLocations = (locations) => ({
  type: SETLOCATIONS,
  payload: {
    locations: locations,
  },
});

export const addLocation = (location) => ({
  type: ADDLOCATION,
  payload: {
    location: location,
  },
});

export const editLocation = (location) => ({
  type: EDITLOCATION,
  payload: {
    location: location,
  },
});

export const deleteLocation = (location) => ({
  type: DELETELOCATION,
  payload: {
    location: location,
  },
});

// Flight Redux Actions
export const setFlights = (flights) => ({
  type: SETFLIGHTS,
  payload: {
    flight: flights,
  },
});

export const addFlight = (flight) => ({
  type: ADDFLIGHT,
  payload: {
    flight: flight,
  },
});

export const editFlight = (flight) => ({
  type: EDITFLIGHT,
  payload: {
    flight: flight,
  },
});

export const deleteFlight = (flight) => ({
  type: DELETEFLIGHT,
  payload: {
    flight: flight,
  },
});

// online action
export const setOnline = (online) => ({
  type: SETONLINE,
  payload: {
    online: online,
  },
});
