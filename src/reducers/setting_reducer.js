import {
  CHANGE_SETTING_VALUE,
  SAVE_NOTIFICATION_SETTING,
  UPDATE_NOTIFICATION_SETTING,
  UPDATE_LAST_LOCATION_SETTING,
} from "../actionTypes";

/* INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  interval: "05 sec",
  language: "german",
  mapType: "standard",
  mapTraffic: false,
  events: false,
  tracking: false,
};

/* =============================================================================
<Setting Reducer />
============================================================================= */
export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_SETTING_VALUE:
      return { ...state, [payload.name]: payload.value };

    case SAVE_NOTIFICATION_SETTING:
      return { ...state, events: !!payload.events };

    case UPDATE_NOTIFICATION_SETTING:
      return { ...state, events: !!payload.events };

    default:
      return state;
  }
}
