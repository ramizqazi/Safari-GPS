// @flow

import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

/* =============================================================================
<Notification />
============================================================================= */
const Notification = props => {
  const notificationListener = useRef();

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        _handleNotification(notification);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    };
  }, []);

  const _handleNotification = async notification => {
    const { handleRoute } = props;
    const action =
      typeof Constants.platform.android === 'undefined'
        ? 'received'
        : 'selected';
    const { route } = notification.data;
    if (notification.origin === action) {
      handleRoute(route);
    }
  };

  return null;
};

/* Exports
============================================================================= */
export default Notification;
