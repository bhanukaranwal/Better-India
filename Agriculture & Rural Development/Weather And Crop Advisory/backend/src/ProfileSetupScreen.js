import React, { useState } from 'react';
import { View, TextInput, Button, Picker, Alert } from 'react-native';

export default function ProfileSetupScreen({ route, navigation }) {
  const { userId, token } = route.params;
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('en');
  const [crops, setCrops] = useState('');

  const saveProfile = async () => {
    try {
      const res = await fetch('https://your-backend/api/users/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ userId, location, language, crops: crops.split(',').map(c => c.trim()) }),
      });
      const data = await res.json();
      if (res.ok) {
        navigation.replace('Dashboard', { userId, token });
      } else {
        Alert.alert('Error', data.message || 'Could not save profile');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Try again.');
    }
  };

  return (
    <View>
      <TextInput placeholder="Village/District" value={location} onChangeText={setLocation} />
      <Picker selectedValue={language} onValueChange={setLanguage}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Hindi" value="hi" />
        <Picker.Item label="Telugu" value="te" />
        {/* Add other languages as needed */}
      </Picker>
      <TextInput
        placeholder="Crops (comma separated)"
        value={crops}
        onChangeText={setCrops}
      />
      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
}
