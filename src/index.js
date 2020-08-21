import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { saveState } from "./LocalCache/localStorage.js";
import axios from "axios";

axios.defaults.baseURL = "http://209.97.155.92:3000";

(async () => {
  try {
    console.log("Loading Cached states if any");
    const storeModule = await import('./Redux/store.js');
    const store = await storeModule.default();

    // If the access token does not work, we need to save the null state when redux gets done with default values
    saveState(store.getState());
    store.subscribe(() => {
      // console.log("Saving the state to local storage");
      // console.log(store.getState());
      saveState(store.getState());
    });
  
    ReactDOM.render(
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>,
      document.getElementById("root")
    );
  
  } catch (error) {
    console.error("Loading application error:", error);
  }
})();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
