import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import checkLoginStatusCode from "../utils/checkLoginStatusCode";
import apiCall from "../utils/apiCall";
import {
  LOGIN_LOADER,
  DEMO_LOGIN_LOADER,
  LOGIN_SUCCESS,
  LOGIN_STATUS_LOADER,
  LOGIN_STATUS_SUCCESS,
  LOG_OUT_SUCCESS,
  LOGIN_FAILED,
  USER_VERSION_SUCCESS,
} from "../actionTypes";
import NetInfo from "@react-native-community/netinfo";
import { translator } from "../languages";
import { APP_VERSION } from '../config'
import { deviceId } from "../utils/deviceId";
import axios from 'axios';

export const login = ({ username, password, server }) => async (dispatch) => {
  let response;
  try {
    dispatch({ type: LOGIN_LOADER, payload: true });

    let device_id;
    device_id = await AsyncStorage.getItem('device_id');

    if(!device_id){
      device_id = deviceId();
      await AsyncStorage.setItem("device_id", device_id);
    }

    if (server === "de") {
      response = await apiCall(
        `https://safari-gps.live/func/fn_connect.php?cmd=react_app_login&username=${username}&password=${password}&device_id=${device_id}`
      );
    } else if (server === "tr") {
      response = await apiCall(
        `https://tr1.safari-gps.live/func/fn_connect.php?cmd=react_app_login&username=${username}&password=${password}&device_id=${device_id}`
      );
    } else if (server === "ua") {
      response = await apiCall(
        `https://ua1.safari-gps.live/func/fn_connect.php?cmd=react_app_login&username=${username}&password=${password}&device_id=${device_id}`
      );
    } else {
      response = await apiCall(
        `https://safari-gps.live/func/fn_connect.php?cmd=react_app_login&username=${username}&password=${password}&device_id=${device_id}`
      );
    }


    await checkLoginStatusCode(response.status);
    await AsyncStorage.setItem("login_token", response.token);
    await AsyncStorage.setItem("server_url", response.server_url);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });

    dispatch({ type: LOGIN_FAILED, payload: false });
  } catch (e) {
    dispatch({ type: LOGIN_FAILED, payload: true });
  } finally {
    dispatch({ type: LOGIN_LOADER, payload: false });
  }
};

/**
 * demo login action
 */
export const demoLogin = ({ server }) => async (dispatch) => {
  let response;
  try {
    dispatch({ type: DEMO_LOGIN_LOADER, payload: true });

    let device_id;
    device_id = await AsyncStorage.getItem('device_id');

    if(!device_id){
      device_id = deviceId();
      await AsyncStorage.setItem("device_id", device_id);
    }

    if (server == "de") {
      response = await apiCall(
        `https://safari-gps.live/func/fn_connect.php?cmd=react_app_login&username=demo&password=demo123&device_id=${device_id}`
      );
    } else if (server == "tr") {
      response = await apiCall(
        `https://tr1.safari-gps.live/func//fn_connect.php?cmd=react_app_login&username=demo&password=demo123&device_id=${device_id}`
      );
    } else if (server == "ua") {
      response = await apiCall(
        `https://ua1.safari-gps.live/func//fn_connect.php?cmd=react_app_login&username=demo&password=demo123&device_id=${device_id}`
      );
    } else {
      response = await apiCall(
        `https://safari-gps.live/func/fn_connect.php?cmd=react_app_login&username=demo&password=demo123&device_id=${device_id}`
      );
    }

    await checkLoginStatusCode(response.status);
    await AsyncStorage.setItem("login_token", response.token);
    await AsyncStorage.setItem("server_url", response.server_url);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response,
    });

    dispatch({ type: DEMO_LOGIN_LOADER, payload: false });
  } catch (e) {
    dispatch({ type: DEMO_LOGIN_LOADER, payload: false });
  }
};

/**
 * check login status action
 */
export const checkLoginStatus = () => async (dispatch) => {
  let response;
  let token;
  try {
    dispatch({ type: LOGIN_STATUS_LOADER, payload: true });
    token = await AsyncStorage.getItem("login_token");

    let device_id;
    device_id = await AsyncStorage.getItem('device_id');

    if(!device_id){
      device_id = deviceId();
      await AsyncStorage.setItem("device_id", device_id);
    }
    
    response = await apiCall(
      `/fn_connect.php?cmd=react_app_check_session&token=${token}&device_id=${device_id}`
    );

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (response.status !== 1) {
          dispatch(logout());
          return;
        }
      } else {
        Alert.alert(
          translator.NO_INTERNET_CONNECTION,
          translator.CHECK_YOUR_CONNECTION
        );
      }
    });

    dispatch({
      type: LOGIN_STATUS_SUCCESS,
      payload: response,
    });
    dispatch({ type: LOGIN_STATUS_LOADER, payload: false });
  } catch (e) {
    dispatch({ type: LOGIN_STATUS_LOADER, payload: false });
  }
};

/**
 * 
 * change user version
 */
 export const changeUserVersion = (token) => async (dispatch) => {
  try {

    const SERVER_URL = await AsyncStorage.getItem('server_url');

    const { data } = await axios.get(
      `${SERVER_URL}/func/fn_connect.php?cmd=react_app_update_version&token=${token}&appVersion=${APP_VERSION}`
    );

    dispatch({ type: USER_VERSION_SUCCESS, payload: APP_VERSION });
  } catch (e) {
    console.log(e)
  }
};


/**
 * logout action
 */
export const logout = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("login_token");
    await apiCall(`/fn_connect.php?cmd=react_app_logout&token=${token}`);
    await AsyncStorage.removeItem("login_token");
    await AsyncStorage.removeItem("server_url");
    dispatch({ type: LOG_OUT_SUCCESS });
  } catch (e) {
    //
  }
};
