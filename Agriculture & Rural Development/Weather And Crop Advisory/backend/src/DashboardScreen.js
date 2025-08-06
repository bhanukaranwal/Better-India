import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Button, Alert } from 'react-native';

export default function DashboardScreen({ route, navigation }) {
  const { userId, token, location } = route.params;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://your-backend/api/weather/${encodeURIComponent(location)}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setWeather(data);
      else Alert.alert('Error', data.error || 'Failed to fetch weather');
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!weather) return <Text style={{ marginTop: 50 }}>No weather data available.</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>{weather.city}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
        style={{ width: 100, height: 100 }}
      />
      <Text style={{ fontSize: 18 }}>{weather.description}</Text>
      <Text>Temperature: {weather.temp} °C</Text>
      <Text>Humidity: {weather.humidity} %</Text>
      <Text>Wind Speed: {weather.windSpeed} m/s</Text>
      <Button title="Refresh" onPress={fetchWeather} />
    </View>
  );
}
