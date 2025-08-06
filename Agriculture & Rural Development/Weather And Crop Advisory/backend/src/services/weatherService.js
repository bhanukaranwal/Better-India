exports.get5DayForecastByLocation = async (location) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&units=metric&appid=${OPENWEATHER_API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch 5-day forecast');
    const data = await res.json();

    // Extract a simplified forecast: one entry per day (e.g., noon data)
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).map(item => ({
      date: item.dt_txt.split(' ')[0],
      temp: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed
    }));

    return dailyForecasts;
  } catch (error) {
    throw error;
  }
};
