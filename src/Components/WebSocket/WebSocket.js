import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { logout, onDarkMode, offDarkMode } from "../../Redux/actions.js";
function WebSocketFrame(props) {
  const ws = useRef(null);

  useEffect(() => {
    console.log("In Websocket");
    if (!ws) return;
    const socket = new WebSocket("wss://airforceofs.com/websocket/");

    socket.addEventListener("open", function (event) {
      socket.send("Hello Server!");
      console.log("Websocket: Opened connection!");
    });

    socket.addEventListener("message", function (event) {
      console.log("Websocket: Message from server ", event.data);
    });

    socket.addEventListener("close", function (event) {
      console.log("Websocket: Websocket conenction closed!");
    });
    ws.current = socket;
  }, []);

  return <span />;
}

const mapDispatchToProps = {
  logoutAction: logout,
  onDMAction: onDarkMode,
  offDMAction: offDarkMode,
};
const mapStateToProps = (state) => {
  return {
    logged: state.loggedReducer.logged,
    darkState: state.darkModeReducer.darkmode,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WebSocketFrame);
