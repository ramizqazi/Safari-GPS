import {
  LOGIN_LOADER,
  DEMO_LOGIN_LOADER,
  LOGIN_SUCCESS,
  LOGIN_STATUS_LOADER,
  LOGIN_STATUS_SUCCESS,
  LOG_OUT_SUCCESS,
  LOGIN_FAILED,
  USER_VERSION_SUCCESS,
} from '../actionTypes';

/* INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  loginLoader: false,
  loginFailed: false,
  demoLoginLoader: false,
  statusLoader: false,
  isLoggedIn: false,
  user: null,
};

/* =============================================================================
< Auth Reducer />
============================================================================= */
export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_LOADER:
      return { ...state, loginLoader: payload };

    case DEMO_LOGIN_LOADER:
      return { ...state, demoLoginLoader: payload };

    case LOGIN_SUCCESS:
      return { ...state, user: payload, isLoggedIn: true };

    case LOGIN_STATUS_LOADER:
      return { ...state, statusLoader: payload };

    case USER_VERSION_SUCCESS:
      return { ...state, user: { ...state.user, version: payload } };

    case LOGIN_STATUS_SUCCESS:
      return { ...state, user: payload, isLoggedIn: true };

    case LOGIN_FAILED:
      return { ...state, loginFailed: payload };

    case LOG_OUT_SUCCESS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
