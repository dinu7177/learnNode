const mongoose = require("mongoose");

const personDetails = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        minlenght : [10, 'Mobile number must be at least 10 characters long'],
        maxlength :[11, 'Mobile number must be at least 10 characters long'],
        message:"must be unique"
    },
    password: {
        type: String,
        required: true,
        hide: true
    },
    address:{
        type:String,
        required: false    
    }
},{ versionKey: false });

// create devotee model
const  DevoteeEntity = mongoose.model("Devotee", personDetails, "Devotees");
module.exports = DevoteeEntity;