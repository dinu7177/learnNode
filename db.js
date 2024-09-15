const mongoose = require("mongoose");
require('dotenv').config();

// Define the mongodb url
const mongoURL = process.env.MONGOURL;

// Define the mongodb connection
mongoose.connect(mongoURL,{
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define the event event listeners for the databse

db.on('connected',()=>{
    console.log("connected to DB")
});

module.exports = db;