import {
  GET_EVENTS_LOADER,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_REJECTED,
  GET_MORE_EVENTS_LOADER,
  GET_MORE_EVENTS_SUCCESS,
  GET_EVENT_DETAILS_LOADER,
  GET_EVENT_DETAILS_SUCCESS,
  REMOVE_EVENT_DETAILS,
} from '../actionTypes';
import apiCall from '../utils/apiCall';

/**
 * get events
 * @param {string} token
 * @param {number} pageNo
 */
export const getEvents = (token, pageNo) => async dispatch => {
  let response;
  let hasMore;
  try {
    dispatch({ type: GET_EVENTS_LOADER, payload: true });
    response = await apiCall(
      `/fn_events.php?cmd=load_event_list&api=true&token=${token}&page=${pageNo}&_search=false&nd=1525042036507&rows=10&sidx=dt_tracker&sord=desc`
    );
    if (response.rows) {
      hasMore = response.page < response.total;
      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: { list: response.rows, pageNo: response.page, hasMore },
      });
    }
    dispatch({ type: GET_EVENTS_LOADER, payload: false });
  } catch (e) {
    dispatch({ type: GET_EVENTS_LOADER, payload: false });
    dispatch({ type: GET_EVENTS_REJECTED, payload: e.message });
  }
};

/**
 * get more events
 * @param {string} token
 * @param {number} pageNo
 */
export const getMoreEvents = (token, pageNo) => async dispatch => {
  let response;
  let hasMore;
  try {
    dispatch({ type: GET_MORE_EVENTS_LOADER, payload: true });
    response = await apiCall(
      `/fn_events.php?cmd=load_event_list&api=true&token=${token}&page=${pageNo}&_search=false&nd=1525042036507&rows=10&sidx=dt_tracker&sord=desc`
    );
    hasMore = response.page < response.total;
    dispatch({
      type: GET_MORE_EVENTS_SUCCESS,
      payload: { list: response.rows, pageNo: response.page, hasMore },
    });
    dispatch({ type: GET_MORE_EVENTS_LOADER, payload: false });
  } catch (e) {
    dispatch({ type: GET_EVENTS_LOADER, payload: false });
  }
};

/**
 * get single event details
 * @param {string} token
 * @param {number} pageNo
 */
export const getEventDetails = (token, eventId) => async dispatch => {
  let response;
  try {
    dispatch({ type: GET_EVENT_DETAILS_LOADER, payload: true });
    response = await apiCall(
      `/fn_events.php?cmd=load_event_data&api=true&token=${token}&event_id=${eventId}`
    );
    dispatch({
      type: GET_EVENT_DETAILS_SUCCESS,
      payload: {
        ...response,
        latitude: Number(response.lat),
        longitude: Number(response.lng),
      },
    });
    dispatch({ type: GET_EVENT_DETAILS_LOADER, payload: false });
  } catch (e) {
    dispatch({ type: GET_EVENT_DETAILS_LOADER, payload: false });
  }
};

/**
 * remove event details
 */

export const removeEventDetails = () => dispatch => {
  dispatch({ type: REMOVE_EVENT_DETAILS });
};

/**
 * customer Selecting
 */
export const getSelectedCustomer = (id) => async dispatch => {
  let response;
  let hasMore;
  try {
    dispatch({ type: GET_MORE_CUSTOMER, payload: true });
    response = await apiCall(
      `/saha/saha.php?op=getCustomers`
    );
   
    dispatch({
      type: GET_MORE_CUSTOMER,
      payload: {  },
    });
    dispatch({ type: GET_MORE_CUSTOMER, payload: false });
  } catch (e) {
    dispatch({ type: GET_MORE_CUSTOMER, payload: false });
  }
};


/**
 * customer Add
 */
export const getAddCustomer = (...customer) => async dispatch => {
  let response;
  let hasMore;
  try {
    dispatch({ type: GET_ADD_CUSTOMER, payload: true });
    response = await apiCall(
      `saha/saha.php?op=addCustomer`
    );
   
    dispatch({
      type: GET_ADD_CUSTOMER,
      payload: {  },
    });
    dispatch({ type: GET_ADD_CUSTOMER, payload: false });
  } catch (e) {
    dispatch({ type: GET_ADD_CUSTOMER, payload: false });
  }
};