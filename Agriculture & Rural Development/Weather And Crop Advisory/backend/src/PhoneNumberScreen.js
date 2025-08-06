// PhoneNumberScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function PhoneNumberScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const sendOtp = async () => {
    try {
      const res = await fetch('https://your-backend/api/users/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: phoneNumber }),
      });

      const data = await res.json();
      if (res.ok) {
        // Navigate to OTP screen with phone number for verification
        navigation.navigate('OtpVerification', { phoneNumber });
      } else {
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Try again.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Send OTP" onPress={sendOtp} />
    </View>
  );
}
