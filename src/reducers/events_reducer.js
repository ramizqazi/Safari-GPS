import {
  GET_EVENTS_LOADER,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_REJECTED,
  GET_MORE_EVENTS_LOADER,
  GET_MORE_EVENTS_SUCCESS,
  GET_EVENT_DETAILS_LOADER,
  GET_EVENT_DETAILS_SUCCESS,
  REMOVE_EVENT_DETAILS,
} from "../actionTypes";

/* INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  loader: false,
  reLoader: false,
  eventLoader: false,
  list: [],
  event: {},
  error: "",
  pageNO: 1,
  hasMore: false,
};

/* =============================================================================
< Auth Reducer />
============================================================================= */
export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_EVENTS_LOADER:
      return { ...state, loader: payload, error: "" };

    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        list: payload.list,
        pageNo: Number(payload.pageNo) + 1,
        hasMore: payload.hasMore,
      };

    case GET_EVENTS_REJECTED:
      return { ...state, error: payload };

    case GET_MORE_EVENTS_LOADER:
      return { ...state, reLoader: payload };

    case GET_MORE_EVENTS_SUCCESS:
      return {
        ...state,
        list: [...state.list, ...payload.list],
        pageNo: Number(payload.pageNo) + 1,
        hasMore: payload.hasMore,
      };

    case GET_EVENT_DETAILS_LOADER:
      return { ...state, loader: payload };

    case GET_EVENT_DETAILS_SUCCESS:
      return { ...state, event: payload };

    case REMOVE_EVENT_DETAILS:
      return { ...state, event: {} };

    default:
      return state;
  }
}
