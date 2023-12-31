import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

/**
 * generate the push token
 */
const generatePushToken = async () => {
  let pushToken;
  try {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return false;
    }
    // Get the token that uniquely identifies this device
    pushToken = await Notifications.getExpoPushTokenAsync();
    return pushToken;
  } catch (e) {
    throw new Error(e.message);
  }
};

export default generatePushToken;
