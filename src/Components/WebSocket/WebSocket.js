import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  addLocation,
  editLocation,
  deleteLocation,
  addFlight,
  addManyFlights,
  editFlight,
  deleteFlight,
  setOnline,
  editAirman,
  approveAirman,
  setSchedule,
  editAircraft,
  addAircraft,
  deleteAircraft,
  addAircraftModel,
  editAircraftModel,
  deleteAircraftModel,
} from "../../Redux/actions.js";

export class WebSocketFrame {
  static ws = null;
  static ready = false;
  static props = null;

  static locationHandler(action, message) {
    console.log("Websocket: Location Handling Send:", action);
    this.ws.send(
      JSON.stringify({
        topic: "location",
        action: action,
        message: message,
      })
    );
  }

  static flightHandler(action, message) {
    console.log("Websocket: Flight Handling Send:", action);
    try {
      let wsMessage = JSON.stringify({
        topic: "flight",
        action: action,
        message: message,
      });
      console.log("Websocket Flight: About to send the message");
      this.ws.send(wsMessage);
    } catch (error) {
      console.log("Websocket Flight Handler Error:", error);
    }
  }

  static generationHandler(action, message) {
    console.log("Websocket: Generation Send:", action);
    try {
      let wsMessage = JSON.stringify({
        topic: "generation",
        action: action,
        message: message,
      });
      console.log("Websocket Generation: About to send the message");
      this.ws.send(wsMessage);
    } catch (error) {
      console.log("Websocket Generation Handler Error:", error);
    }
  }

  static airmanHandler(action, message) {
    console.log("Websocket: Airman Send:", action);
    try {
      let wsMessage = JSON.stringify({
        topic: "airman",
        action: action,
        message: message,
      });
      console.log("Websocket Airman: About to send the message");
      this.ws.send(wsMessage);
    } catch (error) {
      console.log("Websocket Airman Handler Error:", error);
    }
  }

  static aircraftHandler(action, message) {
    console.log("Websocket: Aircraft Send:", action);
    try {
      let wsMessage = JSON.stringify({
        topic: "aircraft",
        action: action,
        message: message,
      });
      console.log("Websocket Aircraft: About to send the message");
      this.ws.send(wsMessage);
    } catch (error) {
      console.log("Websocket Aircraft: Handler Error:", error);
    }
  }

  static aircraftModelHandler(action, message) {
    console.log("Websocket: Aircraft Model Send:", action);
    try {
      let wsMessage = JSON.stringify({
        topic: "aircraft_model",
        action: action,
        message: message,
      });
      console.log("Websocket Aircraft Model: About to send the message");
      this.ws.send(wsMessage);
    } catch (error) {
      console.log("Websocket Aircraft Model: Handler Error:", error);
    }
  }

  static commitHandler(action, message) {
    console.log("Websocket: commit schedule Send:", action);
    try {
      let wsMessage = JSON.stringify({
        topic: "schedule",
        action: action,
        message: message,
      });
      console.log("Websocket commit schedule: About to send the message");
      this.ws.send(wsMessage);
    } catch (error) {
      console.log("Websocket commit schedule Handler Error:", error);
    }
  }

  static closeWebsocket() {
    console.log("Closing websocket");
    if (this.ws.readyState <= 1) {
      this.ws.close();
    }
  }

  static setupWebsocket(websocketObj, props) {
    websocketObj.addEventListener("open", function (event) {
      let date = new Date();
      console.log("Websocket: Opened connection!", date);
      this.ready = true;
      websocketObj.send(
        JSON.stringify({
          topic: "online",
          action: "join",
          token: props.access_token,
        })
      );
      setInterval(
        () => websocketObj.send(JSON.stringify({ topic: "ping" })),
        30000
      );
    });
    this.props = props;

    websocketObj.addEventListener("message", function (event) {
      console.log("Websocket: Message from server ", event);
      let payload = JSON.parse(event.data);
      console.log("Websocket: Payload:", payload);
      let topic = payload.topic;
      let action = payload.action;
      let message = payload.message;
      let error = payload.error;

      if (error) {
        console.log("Websocket: error handling:", error);
        return;
      }

      switch (topic) {
        case "location":
          switch (action) {
            case "add":
              console.log("Websocket: location Add:", message);
              props.addLocationAction(message);
              break;
            case "edit":
              console.log("Websocket: location Edit:", message);
              props.editLocationAction(message);
              break;
            case "delete":
              console.log("Websocket: location Delete:", message);
              props.deleteLocationAction(message);
              break;
            default:
              console.log("Websocket: Location action not supported!:", action);
              break;
          }
          break;

        case "flight":
          switch (action) {
            case "add":
              console.log("Websocket: flight Add:", message);
              props.addFlightAction(message);
              break;
            case "edit":
              console.log("Websocket: flight Edit:", message);
              props.editFlightAction(message);
              break;
            case "delete":
              console.log("Websocket: flight Delete:", message);
              props.deleteFlightAction(message);
              break;
            default:
              console.log("Websocket: Flight action not supported!:", action);
              break;
          }
          break;

        case "online":
          switch (action) {
            case "online":
              console.log("online Online");
              props.setOnlineAction(message);
              break;
            default:
              console.log("Websocket: online action not supported", action);
              break;
          }
          break;

        case "generation":
          switch (action) {
            case "generate":
              console.log("Websocket: generating", message);
              props.setScheduleAction(message);
              break;
            default:
              console.log("Websocket: generation action not supported", action);
              break;
          }
          break;

        case "airman":
          switch (action) {
            case "approve":
              console.log("Websocket: approving airman", message);
              props.approveAirmanAction(message);
              break;
            case "edit":
              console.log("Websocket: editing airman", message);
              props.editAirmanAction(message);
              break;
            default:
              console.log("Websocket: airmen action not supported", action);
              break;
          }
          break;

        case "aircraft":
          switch (action) {
            case "add":
              console.log("Websocket: adding Aircraft");
              props.addAircraftAction(message);
              break;
            case "edit":
              console.log("Websocket: editting Aircraft");
              props.editAircraftAction(message);
              break;
            case "delete":
              console.log("Websocket: deleting Aircraft");
              props.deleteAircraftAction(message);
              break;
            default:
              console.log("Websocket: aircraft action not supported", action);
              break;
          }
          break;

        case "aircraft_model":
          switch (action) {
            case "add":
              console.log("Websocket: adding Aircraft_model");
              props.addAicraftModelAction(message);
              break;
            case "edit":
              console.log("Websocket: editting Aircraft_model");
              props.editAircraftModelAction(message);
              break;
            case "delete":
              console.log("Websocket: deleting Aircraft_model");
              props.deleteAircraftModelAction(message);
              break;
            default:
              console.log("Websocket: aircraft_model action not supported", action);
              break;
          }
          break;

        case "schedule":
          switch (action) {
            case "add_many":
              console.log("adding flights", message);
              props.addManyFlightsAction(message);
              break;
            default:
              console.log("Websocket: schedule action not supported", action);
              break;
          }
          break;

        default:
          console.log("Websocket: General topic not supported:", topic);
          break;
      }
    });

    websocketObj.addEventListener("close", function (event) {
      let date = new Date();
      console.log("Websocket: Websocket conenction closed!", date);
      console.log("Closed Reason:", event);
    });
    this.ws = websocketObj;
  }
}

function WebSocketComponent(props) {
  useEffect(() => {
    const socket = new WebSocket("wss://airforceofs.com/websocket/");
    //const socket = new WebSocket('ws://localhost:3002');
    WebSocketFrame.setupWebsocket(socket, props);
  }, []);
  return <span />;
}

const mapDispatchToProps = {
  addLocationAction: addLocation,
  editLocationAction: editLocation,
  deleteLocationAction: deleteLocation,
  addFlightAction: addFlight,
  addManyFlightsAction: addManyFlights,
  editFlightAction: editFlight,
  deleteFlightAction: deleteFlight,
  editAirmanAction: editAirman,
  approveAirmanAction: approveAirman,
  setOnlineAction: setOnline,
  setScheduleAction: setSchedule,
  addAircraftAction: addAircraft,
  editAircraftAction: editAircraft,
  deleteAircraftAction: deleteAircraft,
  addAicraftModelAction: addAircraftModel,
  editAircraftModelAction: editAircraftModel,
  deleteAircraftModelAction: deleteAircraftModel,
};
const mapStateToProps = (state) => {
  return {
    access_token: state.loggedReducer.accessToken,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketComponent);
