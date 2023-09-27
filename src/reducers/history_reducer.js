import {
  GET_ROUTE_HISTORY_LOADER,
  GET_ROUTE_HISTORY_SUCCESS,
  GET_ROUTE_HISTORY_REJECTED,
  REMOVE_ROUTE_HISTORY,
} from '../actionTypes';

/* INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  loader: false,
  history: [],
  routes: [],
  polyline: [],
  stops: [],
  events: [],
  drives: [],
  details: null,
  error: '',
};

/* =============================================================================
<History Reducer />
============================================================================= */
export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ROUTE_HISTORY_LOADER:
      return { ...state, loader: payload, error: '' };

    case GET_ROUTE_HISTORY_SUCCESS:
      return { ...state, ...payload };

    case GET_ROUTE_HISTORY_REJECTED:
      return { ...state, error: payload };

    case REMOVE_ROUTE_HISTORY:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
