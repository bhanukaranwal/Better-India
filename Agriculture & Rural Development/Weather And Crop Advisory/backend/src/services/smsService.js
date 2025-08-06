const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = new twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

exports.send = (to, message) => {
  return client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to,
    })
    .then(message => console.log('SMS sent:', message.sid))
    .catch(error => console.error('SMS send error:', error));
};
