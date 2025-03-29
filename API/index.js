const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const os = require("os");

dotenv.config();
const app = express();
const port = process.env.PORT || 7000;

app.use(express.json()); // Parse JSON bodies

// PostgreSQL connection
const pool = new Pool({
  user: "aadi",
  host: "localhost",
  database: "signupd",
  password: "1729",
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Failed to connect to the database", err);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});

// Secret for JWT
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// Health check
app.get("/api", (req, res) => res.send("API is working"));
app.get("/api/health", (req, res) =>
  res.status(200).json({ message: "API is healthy" })
);
app.get("/api/stats", (req, res) => {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;

  const cpuLoad = os.loadavg(); // [1min, 5min, 15min]
  const cpus = os.cpus();

  res.json({
    uptime: os.uptime(), // seconds
    platform: os.platform(),
    arch: os.arch(),
    cpu: {
      cores: cpus.length,
      model: cpus[0].model,
      speed: cpus[0].speed, // MHz
      loadavg: cpuLoad,
    },
    memory: {
      total: (totalMem / 1024 ** 3).toFixed(2) + " GB",
      used: (usedMem / 1024 ** 3).toFixed(2) + " GB",
      free: (freeMem / 1024 ** 3).toFixed(2) + " GB",
    },
  });
});
app.get("/api/user/:username", (req, res) => {
  const username = req.params.username;
  pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
    (error, results) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else if (results.rows.length === 0) {
        res.status(404).json({ error: "User not found" });
      } else {
        res.status(200).json(results.rows[0]);
      }
    }
  );
});

// 🔒 Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// 📝 Registration route (expects username, email, and password
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    const newUser = result.rows[0];

    res
      .status(201)
      .json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      });
  } catch (err) {
    console.error("Registration error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// 📝 Registration route (expects username, email, and password)

// 🧾 Login route (expects email and password)
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Login error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔐 Protected route
app.get("/api/users", authenticateToken, (req, res) => {
  pool.query("SELECT id, email FROM users", (error, results) => {
    if (error) {
      console.error("Error executing query", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results.rows);
    }
  });
});

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
