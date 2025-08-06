const fetch = require('node-fetch');

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

exports.getWeatherByLocation = async (location) => {
  // Location can be city/village/district name; for production, use lat/lon coordinates
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${OPENWEATHER_API_KEY}`;

  try {
    const res = await fetch(url);
    if(!res.ok) throw new Error('Failed to fetch weather');
    const data = await res.json();
    // Extract relevant data
    return {
      temp: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
      city: data.name
    };
  } catch (error) {
    throw error;
  }
};
