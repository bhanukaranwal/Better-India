const express = require('express');
const router = express.Router();
const {sendOtp, verifyOtp} = require('../controllers/userController');

router.post('/send-otp', sendOtp);      // Step 1: Request login/signup
router.post('/verify-otp', verifyOtp);  // Step 2: Confirm with received OTP

module.exports = router;
