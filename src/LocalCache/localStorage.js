export const saveState = (state) => {
  try {
    // kill frankenstien
    const serializeState = JSON.stringify(state);
    
    // store body in the corner
    localStorage.setItem('state', serializeState);
  } catch (error) {
    console.log("Saving State Error:", error);
    return null;
  }
}

export const loadState = () => {
  try {
    // retreive the dead body
    const serializeState = localStorage.getItem("state");

    if (serializeState == null) {
      return undefined;
    }
    // bring back frankenstein to life
    let deserializeState = JSON.parse(serializeState);

    return deserializeState;

  } catch (error) {
    console.log("Loading Cached State Error:", error);
    return undefined;
  }
}