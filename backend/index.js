const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importing cors
const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON
app.use(bodyParser.json());

// MySQL Database connection setup
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12801532",
  password: "fUMdTHiMJM",
  database: "sql12801532",
  port: 3306,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Endpoint for registration
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Simple validation to ensure password and username exist
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Vulnerable to SQL Injection if the input is not properly sanitized
  const query =
    "INSERT INTO users (username, password) VALUES ('" +
    username +
    "', '" +
    password +
    "')";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Registration successful!" });
  });
});

// Login route (vulnerable to SQL Injection)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // **Vulnerable SQL Query** (Not using parameterized queries)
  // This query is vulnerable because the username is directly inserted into the SQL string
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];

    // If login is successful
    res.status(200).json({ message: "Login successful!" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
