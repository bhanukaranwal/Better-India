import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

useEffect(() => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);
      // Save this token to backend under the user profile for sending push notifications
    }
  };

  requestUserPermission();

  // Listen to messages when app is in foreground
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    alert('New Notification: ' + remoteMessage.notification.body);
  });

  return unsubscribe;
}, []);
