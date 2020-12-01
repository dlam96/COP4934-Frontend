import {
  LOGIN,
  LOGOUT,
  ONDARKMODE,
  OFFDARKMODE,
  SETAIRMEN,
  APPROVEAIRMAN,
  EDITAIRMAN,
  SETAIRCRAFTMODELS,
  ADDAIRCRAFTMODEL,
  EDITAIRCRAFTMODEL,
  DELETEAIRCRAFTMODEL,
  SETLOCATIONS,
  SETAIRCRAFTS,
  ADDAIRCRAFT,
  EDITAIRCRAFT,
  DELETEAIRCRAFT,
  SETFLIGHTS,
  SETCREWPOSITION,
  SETRANKS,
  SETAIRCRAFTSTATUS,
  SETUSERSTATUS,
  ADDLOCATION,
  EDITLOCATION,
  DELETELOCATION,
  ADDFLIGHT,
  EDITFLIGHT,
  DELETEFLIGHT,
  SETONLINE,
  SETPENDING,
  SETSCHEDULE,
  COMMITSCHEDULE,
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

export const onDarkMode = () => ({
  type: ONDARKMODE,
});

export const offDarkMode = () => ({
  type: OFFDARKMODE,
});

// Airmen actions
export const setAirmen = (airmen) => ({
  type: SETAIRMEN,
  payload: {
    airmen: airmen,
  },
});

export const setPending = (pending) => ({
  type: SETPENDING,
  payload: {
    pending: pending,
  },
});

export const approveAirman = (airman) => ({
  type: APPROVEAIRMAN,
  payload: {
    airman: airman,
  },
});

export const editAirman = (airman) => ({
  type: EDITAIRMAN,
  payload: {
    airman: airman,
  },
});

export const setAircraftModels = (aircraftModels) => ({
  type: SETAIRCRAFTMODELS,
  payload: {
    aircraftmodel: aircraftModels,
  },
});

export const addAircraftModel = (aircraftModel) => ({
  type: ADDAIRCRAFTMODEL,
  payload: {
    aircraftModel: aircraftModel
  }
});

export const editAircraftModel = (aircraftModel) => ({
  type: EDITAIRCRAFTMODEL,
  payload: {
    aircraftModel: aircraftModel
  }
});

export const deleteAircraftModel = (aircraftModel) => ({
  type: DELETEAIRCRAFTMODEL,
  payload: {
    aircraftModel: aircraftModel
  }
})

export const setAircrafts = (aircrafts) => ({
  type: SETAIRCRAFTS,
  payload: {
    aircraft: aircrafts,
  },
});

export const addAircraft = (aircraft) => ({
  type: ADDAIRCRAFT,
  payload: {
    aircraft: aircraft
  }
});

export const editAircraft = (aircraft) => ({
  type: EDITAIRCRAFT,
  payload: {
    aircraft: aircraft
  }
});

export const deleteAircraft = (aircraft) => ({
  type: DELETEAIRCRAFT,
  payload: {
    aircraft: aircraft
  }
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

// generation action
export const setSchedule = (schedule) => ({
  type: SETSCHEDULE,
  payload: {
    schedule: schedule,
  },
});

// commit schedule action
export const commitSchedule = (schedule) => ({
  type: COMMITSCHEDULE,
  payload: {
    schedule: schedule,
  },
});
