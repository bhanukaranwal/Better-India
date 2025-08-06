import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ route, navigation }) {
  const { userId, token, location } = route.params;

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  const WEATHER_CACHE_KEY = `weather_${location}`;
  const FORECAST_CACHE_KEY = `forecast_${location}`;

  // Load cached data first
  const loadCachedData = async () => {
    try {
      const cachedWeather = await AsyncStorage.getItem(WEATHER_CACHE_KEY);
      const cachedForecast = await AsyncStorage.getItem(FORECAST_CACHE_KEY);
      if (cachedWeather) setWeather(JSON.parse(cachedWeather));
      if (cachedForecast) setForecast(JSON.parse(cachedForecast));
    } catch (error) {
      console.log('Error loading cached data', error);
    }
  };

  // Fetch fresh data from backend
  const fetchWeather = async () => {
    try {
      setLoading(true);
      const weatherRes = await fetch(`https://your-backend/api/weather/${encodeURIComponent(location)}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const forecastRes = await fetch(`https://your-backend/api/weather/forecast/${encodeURIComponent(location)}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!weatherRes.ok || !forecastRes.ok) {
        const errorData = await Promise.all([weatherRes.json(), forecastRes.json()]);
        Alert.alert('Error', errorData[0].error || errorData[1].error || 'Failed to fetch weather data');
        setLoading(false);
        return;
      }
      const weatherData = await weatherRes.json();
      const forecastData = await forecastRes.json();

      setWeather(weatherData);
      setForecast(forecastData);

      // Cache the data
      await AsyncStorage.setItem(WEATHER_CACHE_KEY, JSON.stringify(weatherData));
      await AsyncStorage.setItem(FORECAST_CACHE_KEY, JSON.stringify(forecastData));
    } catch (error) {
      Alert.alert('Network error', 'Unable to fetch fresh data, showing cached results if available.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCachedData().then(fetchWeather);
  }, []);

  if (loading && !weather)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!weather && !forecast.length)
    return <Text style={{ marginTop: 50, textAlign: 'center' }}>No weather data available.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.city}>{weather.city}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
        style={styles.icon}
      />
      <Text style={styles.description}>{weather.description}</Text>
      <Text>Temperature: {weather.temp} °C</Text>
      <Text>Humidity: {weather.humidity} %</Text>
      <Text>Wind Speed: {weather.windSpeed} m/s</Text>

      <Text style={styles.forecastTitle}>5-Day Forecast</Text>
      {forecast.length === 0 ? (
        <Text>No forecast data available.</Text>
      ) : (
        forecast.map(day => (
          <View key={day.date} style={styles.forecastItem}>
            <Text>{day.date}</Text>
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${day.icon}@2x.png` }}
              style={styles.smallIcon}
            />
            <Text>{day.description}</Text>
            <Text>Temp: {day.temp} °C</Text>
          </View>
        ))
      )}

      <Button title="Refresh" onPress={fetchWeather} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  forecastTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  smallIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});
