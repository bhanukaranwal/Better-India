const User = require('../models/User');
const firebaseService = require('./firebaseService');
const smsService = require('./smsService');

async function sendWeatherAlerts() {
  const users = await User.find({}); // filter as needed

  for (const user of users) {
    const message = 'Severe weather alert: Heavy rainfall expected tomorrow. Take precautions.';

    // Send Push Notification (if user subscribed)
    if (user.fcmToken) {
      await firebaseService.sendPushNotification(user.fcmToken, 'Weather Alert', message);
    }

    // Send SMS notification
    await smsService.send(user.mobile, message);
  }
}
