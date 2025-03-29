const express = require('express');

const app = express();
const port = process.env.PORT || 7000;

const { Pool } = require('pg');

const pool = new Pool({
  user: 'aadi',
  host: 'localhost',
  database: 'signupd',
  password: '1729', // Hardcoded for testing
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database", err);
  } else {
    console.log("Connected to PostgreSQL database");
    module.exports = pool;
  }
});

app.get('/api', (req, res) => {
  res.send('API is working');
}
);

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is healthy' });
    }
);

app.get('/api/users', (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(results.rows);
    }
  });
}
);

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
}
);
// Export the app for testing
