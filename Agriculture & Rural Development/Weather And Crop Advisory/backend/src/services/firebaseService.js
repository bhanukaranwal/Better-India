const admin = require('firebase-admin');
const serviceAccount = require('../../path/to/firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendPushNotification = async (token, title, body, data = {}) => {
  const message = {
    notification: { title, body },
    data,
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Push notification sent:', response);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};
