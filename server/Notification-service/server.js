const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS middleware for enabling Cross-Origin Resource Sharing
const bodyParser = require("body-parser"); // Import body-parser middleware for parsing JSON requests
const dotenv = require("dotenv").config(); // Load environment variables from .env file
const Notification = require("./routes/Notification"); // Import the router for handling notification routes

const app = express(); // Create an Express application instance

const PORT = process.env.PORT; // Define the port to listen on

app.use(bodyParser.json()); // Parse JSON requests using body-parser middleware

// Enable CORS for all routes
app.use(cors());

// Routes
app.use("/", Notification); // Mount the notification router at the root URL

// Start the server, listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`); // Log a message when the server starts
});
