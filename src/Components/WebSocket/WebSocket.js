import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addLocation, editLocation, deleteLocation, addFlight, editFlight, deleteFlight } from "../../Redux/actions.js";


export class WebSocketFrame {
  static ws = null;
  static ready = false;
  static props = null;

  static locationHandler(action, message) {
    console.log("Websocket: Location Handling Send:", action);
    this.ws.send(JSON.stringify({
      topic: "location",
      action: action, 
      message: message
    }));
  }

  static flightHandler(action, message) {
    console.log("Websocket: Flight Handling Send:", action);
    try {
      let wsMessage = JSON.stringify({
        topic: "flight",
        action: action,
        message: message
      });
      console.log("Websocket Flight: About to send the message");
      this.ws.send(wsMessage);
    } catch(error) {
      console.log("Websocket Flight Handler Error:", error);
    }
  }

  static setupWebsocket(websocketObj, props) {
    websocketObj.addEventListener("open", function (event) {
      let date = new Date();
      console.log("Websocket: Opened connection!", date);
      this.ready = true;

      setInterval(() => websocketObj.send(JSON.stringify({topic: "ping"})), 30000);
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
              console.log("location Add:", message);
              props.addLocationAction(message);
              break;
            case "edit":
              console.log("location Edit:", message);
              props.editLocationAction(message);
              break;
            case "delete":
              console.log("location Delete:", message);
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
              console.log("flight Add:", message);
              props.addFlightAction(message);
              break;
            case "edit":
              console.log("flight Edit:", message);
              props.editFlightAction(message);
              break;
            case "delete":
              console.log("flight Delete:", message);
              props.deleteFlightAction(message);
              break;
            default:
              console.log("Websocket: Flight action not supported!:", action);
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
    WebSocketFrame.setupWebsocket(socket, props);
  },[]);
  return (
    <span />
  );
}

const mapDispatchToProps = {
  addLocationAction: addLocation,
  editLocationAction: editLocation,
  deleteLocationAction: deleteLocation,
  addFlightAction: addFlight,
  editFlightAction: editFlight,
  deleteFlightAction: deleteFlight
};
const mapStateToProps = (state) => {
  return {
    state: state
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketComponent);
