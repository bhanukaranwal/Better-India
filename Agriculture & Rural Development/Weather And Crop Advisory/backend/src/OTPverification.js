// OtpVerificationScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function OtpVerificationScreen({ route, navigation }) {
  const { phoneNumber } = route.params;
  const [enteredOtp, setEnteredOtp] = useState('');

  const verifyOtp = async () => {
    try {
      const res = await fetch('https://your-backend/api/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: phoneNumber, otp: enteredOtp }),
      });

      const data = await res.json();
      if (res.ok) {
        // Save token securely (AsyncStorage or SecureStore)
        // Then navigate to app's main/profile screen
        navigation.replace('Dashboard', { userId: data.userId, token: data.token });
      } else {
        Alert.alert('Error', data.error || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Try again.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={enteredOtp}
        onChangeText={setEnteredOtp}
      />
      <Button title="Verify OTP" onPress={verifyOtp} />
    </View>
  );
}
