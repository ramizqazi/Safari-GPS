import {
  GET_CARS_LOADER,
  GET_CARS_SUCCESS,
  GET_CARS_REJECTED,
  CHANGE_CAR_NAME_LOADER,
} from '../actionTypes';
import updateObjectPropertyInArray from '../utils/updateObjectPropertyInArray';

/* INITIAL_STATE
============================================================================= */
const INITIAL_STATE = {
  loader: false,
  editCarLoader: false,
  cars: [],
  error: '',
};

/* =============================================================================
< Tracking Reducer />
============================================================================= */
export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CARS_LOADER:
      return { ...state, loader: payload, error: '' };
    case GET_CARS_SUCCESS:
      return { ...state, cars: payload };
    case GET_CARS_REJECTED:
      return { ...state, error: payload };

    case CHANGE_CAR_NAME_LOADER:
      return { ...state, editCarLoader: payload };
    default:
      return state;
  }
}
