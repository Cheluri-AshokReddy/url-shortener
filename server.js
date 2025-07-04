const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const urlRoutes = require('./routes/urlRoutes');
const pool = require('./config/db');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', urlRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log(`DB connected at: ${new Date().toISOString()}`);
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('DB connection error:', err.message);
  }
});
