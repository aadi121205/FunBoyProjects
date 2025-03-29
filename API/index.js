const express = require('express');
const connectDB = require('./db');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 7000;

require('dotenv').config();
connectDB();

app.use(express.json());

app.use('/api',userRouter);
app.use('/api',authRouter);
app.use('/api',postRouter);
app.get("/api/system", (req, res) => {
    res.json({
        message: "System is running",
        status: true,
        time: new Date().toISOString(),
    });
}
);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
  module.exports = app;