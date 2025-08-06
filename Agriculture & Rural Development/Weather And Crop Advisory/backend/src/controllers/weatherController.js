const weatherService = require('../services/weatherService');

exports.getWeather = async (req, res) => {
  const { location } = req.params;
  try {
    const weatherData = await weatherService.getWeatherByLocation(location);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error fetching weather' });
  }
};
