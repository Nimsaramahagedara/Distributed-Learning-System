const express = require('express')
const{SendSMS,SendEmail} = require("../controllers/NotificationController");

const Router = express.Router();

Router.post('/sendsms', SendSMS);
Router.post('/sendemail', SendEmail);

module.exports = Router