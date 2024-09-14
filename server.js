const express = require("express");
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function(req,res){
    res.send("welcome to Annadan")
});

// Import the router file
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// use routes
app.use('/devotee', personRoutes);
app.use('/menu', menuRoutes);
 
app.listen(3000, () => {
    console.log("server is listening")
});