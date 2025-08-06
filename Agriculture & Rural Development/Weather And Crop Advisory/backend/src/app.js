// backend/src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const advisoryRoutes = require('./routes/advisoryRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/advisory', advisoryRoutes);
app.use('/api/weather', weatherRoutes);

app.get('/', (req, res) => res.send('Weather & Crop Advisory API Running'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
