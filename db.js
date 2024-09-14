const mongoose = require("mongoose");

// Define the mongodb url
const mongoURL = "mongodb+srv://dinesh:dinesh@cluster0.e73xo1i.mongodb.net/dinesh";

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