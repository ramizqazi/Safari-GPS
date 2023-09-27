import { GET_PLACE_MARKERS, GET_PLACE_ZONE, GET_ROUTES } from '../actionTypes';
import apiCall from '../utils/apiCall';
import convertObjectToArray from '../utils/convertObjectToArray';
import changeZoneObjectToArray from '../utils/changeZoneObjectToArray';
import changePlaceRoutesObjectToArray from '../utils/changePlaceRoutesObjectToArray';

/**
 * get place markers
 * @param {string} token
 */
export const getPlaceMarkers = token => async dispatch => {
  let response;
  let markers = [];
  try {
    response = await apiCall(
      `/fn_places.php?api=true&cmd=load_marker_data_react&token=${token}`
    );
    markers = await convertObjectToArray(response);
    dispatch({ type: GET_PLACE_MARKERS, payload: markers });
  } catch (e) {
    //
  }
};

/**
 * get place zone
 * @param {string} token
 */
export const getPlaceZone = token => async dispatch => {
  let response;
  let zone = [];
  try {
    response = await apiCall(
      `/fn_places.php?api=true&cmd=load_places_data_react&token=${token}`
    );
    zone = await changeZoneObjectToArray(response);
    dispatch({ type: GET_PLACE_ZONE, payload: zone });
  } catch (e) {
    //
  }
};

/**
 * get routes
 */
export const getRoutes = token => async dispatch => {
  let response;
  let routes = [];
  try {
    response = await apiCall(
      `/fn_places.php?api=true&cmd=load_route_data_react&token=${token}`
    );
    routes = await changePlaceRoutesObjectToArray(response);
    dispatch({ type: GET_ROUTES, payload: routes });
  } catch (e) {
    //
  }
};
