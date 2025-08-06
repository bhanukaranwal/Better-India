const User = require('../models/User');
const jwt = require('jsonwebtoken');
// Use any SMS API provider: Twilio, Exotel, MSG91, etc.
const SMS = require('../services/smsService');

exports.sendOtp = async (req, res) => {
  const {mobile} = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  // Store OTP in DB (ideally expire it in 5 mins)
  await User.updateOne({mobile}, {otp, otpExpires: Date.now() + 300000}, {upsert: true});
  SMS.send(mobile, `Your OTP: ${otp}`);
  res.json({message: 'OTP sent'});
};

exports.verifyOtp = async (req, res) => {
  const {mobile, otp} = req.body;
  const user = await User.findOne({mobile, otp, otpExpires: {$gt: Date.now()}});
  if (!user) return res.status(401).json({error: 'Invalid OTP'});
  // JWT sign
  const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
  await User.updateOne({mobile}, {$unset: {otp: ""}});
  res.json({token, userId: user._id});
};
