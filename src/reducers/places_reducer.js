import { GET_PLACE_MARKERS, GET_PLACE_ZONE, GET_ROUTES } from '../actionTypes';

/* INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  markers: [],
  zone: [],
  routes: [],
};

/* =============================================================================
<Places Reducer />
============================================================================= */
export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PLACE_MARKERS:
      return { ...state, markers: payload };

    case GET_PLACE_ZONE:
      return { ...state, zone: payload };

    case GET_ROUTES:
      return { ...state, routes: payload };

    default:
      return state;
  }
}
