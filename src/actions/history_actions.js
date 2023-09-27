import {
  GET_ROUTE_HISTORY_LOADER,
  GET_ROUTE_HISTORY_SUCCESS,
  GET_ROUTE_HISTORY_REJECTED,
  REMOVE_ROUTE_HISTORY,
} from '../actionTypes';
import apiCall from '../utils/apiCall';
import generateRouteHistory from '../utils/generateRouteHistory';

/**
 * get route history
 * @param {string} token
 * @param {string} imei
 * @param {string} dtf
 * @param {string} dtt
 * @param {number} duration
 */
export const getRouteHistory = (
  token,
  { imei, dtf, dtt, duration }
) => async dispatch => {
  let response;

  try {
    dispatch({ type: GET_ROUTE_HISTORY_LOADER, payload: true });

    response = await apiCall(
      `/fn_history.php?cmd=load_route_data&api=true&token=${token}&imei=${imei}&dtf=${dtf}&dtt=${dtt}&min_stop_duration=${duration}`
    );
    response = await generateRouteHistory(response);

    dispatch({ type: GET_ROUTE_HISTORY_SUCCESS, payload: response });
    dispatch({ type: GET_ROUTE_HISTORY_LOADER, payload: false });
    return response;
  } catch (e) {
    dispatch({ type: GET_ROUTE_HISTORY_REJECTED, payload: e.message });
    dispatch({ type: GET_ROUTE_HISTORY_LOADER, payload: false });
    return false;
  }
};

/**
 * remove route history
 */
export const removeRouteHistory = () => dispatch => {
  dispatch({ type: REMOVE_ROUTE_HISTORY });
};
