import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import apiCall from '../utils/apiCall';
import { saveNotificationSetting } from './setting_actions';

import { deviceId } from '../utils/deviceId';

/**
 * set the channel if for android
 */
export const setChannelId = () => {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('push_notification', {
      name: 'Push Notification',
      sound: true,
    });
  }
};

/**
 * generate the push token
 */
export const generatePushNotificationToken = async () => {
  let pushToken;
  try {
    /*const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );*/

    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      throw new Error('Notification permissions are not granted!');
    }
    // Get the token that uniquely identifies this device
    pushToken = await Notifications.getExpoPushTokenAsync();

    return pushToken.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

/**
 * register push notification and send token to server
 * @param {string} language
 */
export const savePushNotificationToken = language => async dispatch => {
  try {

    const push_token = await generatePushNotificationToken();
    await setChannelId();

    let device_id;
    device_id = await AsyncStorage.getItem('device_id');

    if(!device_id){
      device_id = deviceId();
      await AsyncStorage.setItem("device_id", device_id);
    }

    const response = await apiCall(
      `/fn_connect.php?cmd=react_app_save_pushtoken&push_token=${push_token}&device_id=${device_id}&lng=${language}`
    );

    /*console.log( `/fn_connect.php?cmd=react_app_save_pushtoken&push_token=${push_token}&device_id=${device_id}&lng=${language}`);
    console.log(response);*/

    dispatch(
      saveNotificationSetting(
        Number(response.event_push)
      )
    );
    await AsyncStorage.setItem('push_token', push_token);
  } catch (e) {
    //
  }
};
