import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { loadState } from "../LocalCache/localStorage.js";
import axios from "axios";


async function setupCachedState() {
  let localCache = loadState();

  console.log("Loading Cache!");
  console.log(localCache);

  if (localCache && localCache.loggedReducer && localCache.loggedReducer.logged) {
    if (localCache.loggedReducer.accessTokenCreated && localCache.loggedReducer.accessTokenExpiresIn) {

      let today = new Date();
      let tokenDate = new Date(localCache.loggedReducer.accessTokenCreated);

      let timeZoneOffset = today.getTimezoneOffset()*60*1000;
      today = new Date(today.getTime() + timeZoneOffset);

      tokenDate = new Date(tokenDate.getTime() + localCache.loggedReducer.accessTokenExpiresIn * 1000);
      console.log("Loading Token - Our Time:", today);
      console.log("Loading Token - Token Time", tokenDate);

      if (today > tokenDate) {
        console.log("Access_Token has expired forcing logout");
        localCache.loggedReducer.logged = false;
      } else {
        console.log("Setting access token from localCache");
        
        // Set gotEssentialPayload back to false to get request on page reload
        localCache.loggedReducer.gotEssentialRequest = false;

        let accessToken = localCache.loggedReducer.accessToken;
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        console.log("AccessToken:", accessToken);
      }
    }
  }


  if (!localCache || !localCache.loggedReducer.logged) {
    // Since we want to keep the dark mode persistent reguardless of logged in or out lets give it to the rootReducer
    let persistentCache = {};
    persistentCache["darkModeReducer"] = localCache.darkModeReducer;
    return createStore(rootReducer, persistentCache);
  }

  return createStore(rootReducer, localCache);
}

export default setupCachedState;
