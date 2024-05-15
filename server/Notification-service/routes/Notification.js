const express = require('express'); // Import Express framework

// Import the functions to handle sending SMS and emails from NotificationController module
const { SendSMS, SendEmail } = require("../controllers/NotificationController");

const Router = express.Router(); // Create a new router instance using Express

// Define route to handle POST requests for sending SMS
Router.post('/sendsms', SendSMS);

// Define route to handle POST requests for sending emails
Router.post('/sendemail', SendEmail);

module.exports = Router; // Export the router to be used in other parts of the application
