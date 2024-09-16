const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleDateString()} Request made to : ${req.originalUrl}`);
    next(); // Move to next phase
};

app.use(logRequest);

// Authentication function
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/',localAuthMiddleware, function(req,res){
    res.send("welcome to Annadan")
});

// Import the router file
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// use routes
app.use('/devotee', personRoutes);
app.use('/menu', menuRoutes);

// pass port below from .env file
const port = process.env.PORT;
app.listen(port, () => {
    console.log("server is listening")
});