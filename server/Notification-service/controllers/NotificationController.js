const { Vonage } = require("@vonage/server-sdk");
const dotenv = require("dotenv").config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const vonage = new Vonage({
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,
});

const SendSMS = async (req, res) => {
  try {
    const { to, text } = req.body;
    
    if (!to || !text) {
        return res
        .status(400)
        .json("Insufficient parameters" ); 
    }

    const from = "94717270500";

    await vonage.sms.send({ to, from, text });
  
    return res.status(201).json("Message sent successfully");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "There was an error sending the messages." });
  }
};

const SendEmail = async(req,res)=>{
  try {

    const { to, subject,text } = req.body;
    
    if (!to || !text || !subject) {
        return res
        .status(400)
        .json("Insufficient parameters" ); 
    } 
    const msg = {
      to: to,
      from: 'yasitha.renuk@gmail.com',
      subject: subject,
      text: text,
      html: '<strong>'+text+'</strong>',
    };

    sgMail
    .send(msg)
    .then(() => {
      return res.status(201).json("Email sent successfully");
    })
    .catch((error) => {
      console.error(error)
      return res
    .status(500)
    .json({ error: "There was an error sending the Email." });
    })

}catch (error) {
  console.error(error);
  return res
    .status(500)
    .json({ error: "There was an error sending the messages." });
}

}

module.exports = {
  SendSMS,
  SendEmail
}