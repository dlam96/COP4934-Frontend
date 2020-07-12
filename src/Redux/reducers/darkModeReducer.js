import { ONDARKMODE, OFFDARKMODE } from "../actionTypes";

export default function darkModeReducer(state = { darkmode: false }, action) {
  switch (action.type) {
    case ONDARKMODE: {
      return {
        darkmode: true,
      };
    }
    case OFFDARKMODE: {
      return {
        darkmode: false,
      };
    }
    default: {
      return state;
    }
  }
}
