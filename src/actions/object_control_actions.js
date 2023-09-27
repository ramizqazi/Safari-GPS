import {
  GET_OBJECT_CONTROL_COMMANDS,
  SEND_OBJECT_CONTROL_COMMAND_LOADER,
  SEND_OBJECT_CONTROL_COMMAND_SUCCESS,
  GET_OBJECT_CONTROL_COMMANDS_LIST_LOADER,
  GET_OBJECT_CONTROL_COMMANDS_LIST_REJECTED,
  GET_OBJECT_CONTROL_COMMANDS_LIST_SUCCESS,
} from '../actionTypes';
import apiCall from '../utils/apiCall';

/**
 * get news
 * @param {string} token
 * @param {string} language
 */
export const getSentCommands = (token, language) => async dispatch => {
  let response;
  try {
    dispatch({ type: GET_OBJECT_CONTROL_COMMANDS_LIST_LOADER, payload: true });
    response = await apiCall(
      `/react_cmd.php?cmd=react_get_sent_commands&token=${token}&lng=${language}`
    );
    dispatch({
      type: GET_OBJECT_CONTROL_COMMANDS_LIST_SUCCESS,
      payload: response,
    });
    dispatch({ type: GET_OBJECT_CONTROL_COMMANDS_LIST_LOADER, payload: false });

    return response;
  } catch (e) {
    dispatch({ type: GET_OBJECT_CONTROL_COMMANDS_LIST_LOADER, payload: false });
    dispatch({
      type: GET_OBJECT_CONTROL_COMMANDS_LIST_REJECTED,
      payload: e.message,
    });
  }
};

/**
 * get commands
 * @param {string} language
 */
export const getCommands = (token, language) => async dispatch => {
  let response;
  let commands;
  try {
    response = await apiCall(
      `/react_cmd.php?cmd=react_get_commands&token=${token}&lng=${language}`
    );
    commands = response.map(item => ({
      key: item.cmd,
      value: item.cmd,
      label: item.friendly_cmd,
    }));
    dispatch({ type: GET_OBJECT_CONTROL_COMMANDS, payload: commands });
  } catch (e) {
    //
  }
};

/**
 * send command
 * @param {string} language
 * @param {string} imei
 * @param {string} command
 */
export const sendCommand = (
  token,
  language,
  imei,
  command
) => async dispatch => {
  let response;
  try {
    dispatch({ type: SEND_OBJECT_CONTROL_COMMAND_LOADER, payload: true });
    response = await apiCall(
      `/react_cmd.php?cmd=react_send_commands&token=${token}&lng=${language}&imei=${imei}&command=${command}`
    );
    dispatch({ type: SEND_OBJECT_CONTROL_COMMAND_SUCCESS, payload: response });
    dispatch({ type: SEND_OBJECT_CONTROL_COMMAND_LOADER, payload: false });
    return true;
  } catch (e) {
    dispatch({ type: SEND_OBJECT_CONTROL_COMMAND_LOADER, payload: false });
    return false;
  }
};
