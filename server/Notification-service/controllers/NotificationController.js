// Import necessary packages and modules
const { Vonage } = require("@vonage/server-sdk"); // Vonage SDK for SMS
const dotenv = require("dotenv").config(); // Load environment variables from .env file

const sgMail = require('@sendgrid/mail'); // SendGrid for sending emails
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set SendGrid API key

// Initialize Vonage with API key and secret
const vonage = new Vonage({
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,
});

// Function to send SMS
const SendSMS = async (req, res) => {
  try {
    // Extract necessary data from request body
    const { to, text } = req.body;
    
    // Check if required parameters are provided
    if (!to || !text) {
        return res
        .status(400)
        .json("Insufficient parameters" ); // Return error if parameters are missing
    }

    const from = "94717270500"; // Sender number for SMS

    // Send SMS using Vonage SDK
    await vonage.sms.send({ to, from, text });
  
    return res.status(201).json("Message sent successfully"); // Return success response
  } catch (error) {
    console.error(error); // Log any errors
    return res
      .status(500)
      .json({ error: "There was an error sending the messages." }); // Return error response
  }
};

// Function to send Email
const SendEmail = async(req,res)=>{
  try {
    // Extract necessary data from request body
    const { to, subject,text } = req.body;
    
    // Check if required parameters are provided
    if (!to || !text || !subject) {
        return res
        .status(400)
        .json("Insufficient parameters" ); // Return error if parameters are missing
    } 

    // Construct email message
    const msg = {
      to: to,
      from: 'yasitha.renuk@gmail.com', // Sender email address
      subject: subject,
      text: text,
      html: '<strong>'+text+'</strong>', // HTML content of the email
    };

    // Send email using SendGrid
    sgMail
    .send(msg)
    .then(() => {
      return res.status(201).json("Email sent successfully"); // Return success response
    })
    .catch((error) => {
      console.error(error); // Log any errors
      return res
    .status(500)
    .json({ error: "There was an error sending the Email." }); // Return error response
    })

  } catch (error) {
    console.error(error); // Log any errors
    return res
      .status(500)
      .json({ error: "There was an error sending the messages." }); // Return error response
  }
}

// Export the functions to be used in other modules
module.exports = {
  SendSMS,
  SendEmail
}
