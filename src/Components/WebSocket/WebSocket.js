import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { setWebSocket, addLocation, editLocation, deleteLocation } from "../../Redux/actions.js";

class WebSocketFrame {
  static ws = null;
  static ready = false;
  static props = null;

  constructor(websocketObj, props) {
    console.log("Websocket constructor:", websocketObj);
    websocketObj.addEventListener("open", function (event) {
      console.log("Websocket: Opened connection!");
      this.ready = true;
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
        console.log("Websocket: error handling:");
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
              break;
            case "delete":
              console.log("location Delete:", message);
              break;
          }
          break;
      }

    });

    websocketObj.addEventListener("error", (event) => {
      console.log("Websocket: Error:", event);
    })

    websocketObj.addEventListener("close", function (event) {
      console.log("Websocket: Websocket conenction closed!");
    });
    this.ws = websocketObj;
  }

  addLocation(value) {
    console.log("Websocket: Adding Location");

      this.ws.send(JSON.stringify({
        topic: "location",
        action: "add", 
        message: 
        {
          location_name: value,
          track_num: 50
        }
      }));

      console.log("Websocket is not opened yet");

  }
}

function WebSocketComponent(props) {
  const wsObj = useRef(null);
  const wsAction = props.websocketAction;
  useEffect(() => {
    console.log("In Websocket");
    if (!wsObj) return;
    const socket = new WebSocket("wss://airforceofs.com/websocket/");

    console.log("Websocket Object", JSON.stringify(socket));
    let wss = new WebSocketFrame(socket, props);
    wsObj.current = wss;
    wsAction(wss);
  },[wsAction]);


  return (
    <span />
  );
}

const mapDispatchToProps = {
  websocketAction: setWebSocket,
  addLocationAction: addLocation,
  editLocationAction: editLocation,
  deleteLocationAction: deleteLocation
};
const mapStateToProps = (state) => {
  return {
    state: state
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketComponent);
