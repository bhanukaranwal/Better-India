const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Use bcrypt for secure hash.
  role: { type: String, enum: ['farmer', 'buyer'], required: true },
  address: String,
  cropsOwned: [String], // for farmer
});
module.exports = mongoose.model('User', userSchema);
