router.get('/forecast/:location', async (req, res) => {
  const { location } = req.params;
  try {
    const forecast = await weatherService.get5DayForecastByLocation(location);
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error fetching 5-day forecast' });
  }
});
