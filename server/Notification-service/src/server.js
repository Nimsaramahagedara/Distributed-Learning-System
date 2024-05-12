const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const Notification = require("./routes/Notification");

const app = express();

const PORT = process.env.PORT || 8070;

// app.use(cors({
//   origin: 'http://localhost:5173', // Specify your frontend URL
//   credentials: true // Allow sending cookies
// }));
app.use(bodyParser.json());


// Routes
app.use("/Notification", Notification);
  
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
