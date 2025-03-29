const express = require('express');

const app = express();
const port = process.env.PORT || 7000;


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
