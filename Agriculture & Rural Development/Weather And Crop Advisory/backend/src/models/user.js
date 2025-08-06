const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  mobile: {type: String, required: true, unique: true},
  otp: String,
  otpExpires: Date,
  language: {type: String, default: 'en'},
  location: String,       // e.g., "Pt. X", "District Y"
  crops: [String],        // List of crops user is interested in
});
module.exports = mongoose.model('User', userSchema);
