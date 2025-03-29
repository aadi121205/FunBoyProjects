const express = require('express');

const app = express();
const port = process.env.PORT || 7000;
// db.js
const { Pool } = require('pg');
require('dotenv').config(); // Optional, if using .env

const pool = new Pool({
  user: process.env.DB_USER || 'your_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'your_db',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;

app.get('/api', (req, res) => {
  res.send('API is working');
}
);

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is healthy' });
    }
);

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
}
);
// Export the app for testing
