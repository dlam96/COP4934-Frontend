const locationHandler = (action, payload) => {
  switch (action) {

    case "add":
      console.log("Websocket: Location Add Case!");
      break;

    case "edit":
      console.log("Websocket: Location Edit Case!");
      break;

    case "delete":
      console.log("Websocket: Location Delete Case!");
      break;

    default:
      console.error("Websocket: Location was given wrong action:", action);
      break;
  }
}