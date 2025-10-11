const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importing cors
const app = express();
const jwt = require("jsonwebtoken");
const port = 3000;

const SECRET_KEY = "getme"; // You can store this in environment variables

// Use CORS middleware
app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON
app.use(bodyParser.json());

/*// MySQL Database connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nik@1631",
  database: "testing",
  port: 3306,
});

/*// MySQL Database connection setup
const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12801532",
  password: "fUMdTHiMJM",
  database: "sql12801532",
  port: 3306,
});*/

<<<<<<< HEAD
/*const db = mysql.createConnection({
=======
const db = mysql.createConnection({
>>>>>>> 66a66899a0c91ef4502c8d1ddb876d2135714737
  host: "mydb.ct80o4squ1iu.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "Niko1631",
  database: "testing",
  port: 3306,
<<<<<<< HEAD
}); */
=======
});
>>>>>>> 66a66899a0c91ef4502c8d1ddb876d2135714737

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Function to generate a JWT token
function generateJwtToken(username) {
  // Create a payload, in this case just the username, but you can include more data
  const payload = { username };

  // Set token expiry time (e.g., 1 hour)
  const options = { expiresIn: "1h" };

  // Sign and generate the token
  const token = jwt.sign(payload, SECRET_KEY, options);

  return token;
}

<<<<<<< HEAD
=======
// Verification
>>>>>>> 66a66899a0c91ef4502c8d1ddb876d2135714737
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token
  if (!token) return res.status(403).json({ message: "Token is required" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // Attach user info to the request
    next();
  });
};

<<<<<<< HEAD

=======
// getting all the users
>>>>>>> 66a66899a0c91ef4502c8d1ddb876d2135714737
app.get("/users", verifyToken, (req, res) => {
  const currentUsername = req.user.username; // Get current user's username from the token payload

  // SQL query to select all users except the current user
  const query = `SELECT id, username, email, status FROM users WHERE username != '${currentUsername}'`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

<<<<<<< HEAD
=======
// Deleting the specific users
>>>>>>> 66a66899a0c91ef4502c8d1ddb876d2135714737
app.delete("/users/:id", verifyToken, (req, res) => {
  const userId = req.params.id;
  console.log("Deleting user with ID:", userId);
  // SQL query to delete the user
  const query = `DELETE FROM users WHERE id = ${userId}`;
<<<<<<< HEAD
  console.log("Executing query:", query);
=======

>>>>>>> 66a66899a0c91ef4502c8d1ddb876d2135714737
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  });
});

// Endpoint for registration
app.post("/register", (req, res) => {
  const { username, password, email } = req.body;

  // Simple validation to ensure password and username exist
  if (!username || !password || !email ) {
    return res
      .status(400)
      .json({ error: "Username, password, email, and status are required" });
  }

  // Vulnerable to SQL Injection if the input is not properly sanitized
  const query = `INSERT INTO users (username, password, email) VALUES ('${username}', '${password}', '${email}')`;

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
  const token = generateJwtToken(username);
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = results[0];

    // If login is successful
    res.status(200).json({ message: "Login successful!", token });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
