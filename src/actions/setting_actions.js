import {
  CHANGE_SETTING_VALUE,
  SAVE_NOTIFICATION_SETTING,
  UPDATE_NOTIFICATION_SETTING,
} from "../actionTypes";
import { updateLanguage } from "../languages";
import apiCall from "../utils/apiCall";
/**
 *  changing the values
 * @param {string} name
 * @param {string} value
 */
export const changeValue = (name, value) => (dispatch) => {
  dispatch({ type: CHANGE_SETTING_VALUE, payload: { name, value } });
};

/**
 * change language
 * @param {string} language
 */
export const changeLanguage = (language) => (dispatch) => {
  updateLanguage(language);
  dispatch({
    type: CHANGE_SETTING_VALUE,
    payload: { name: "language", value: language },
  });
};

/**
 * saving the push notification setting
 * @param {string} events
 */
export const saveNotificationSetting = (events) => (dispatch) => {
  dispatch({ type: SAVE_NOTIFICATION_SETTING, payload: { events } });
};

/**
 * update notification setting
 * @param {string} login_token
 * @param {string} events
 * @param {string} news
 * @param {string} language
 */
export const updateNotificationSetting = (
  login_token,
  events,
  language
) => async (dispatch) => {
  try {
    await apiCall(
      `/fn_connect.php?cmd=react_app_save_push_settings&login_token=${login_token}&event_push=${events}&news_push=1&lan=${language}`
    );
    dispatch({ type: UPDATE_NOTIFICATION_SETTING, payload: { events } });
  } catch (e) {
    //
  }
};
