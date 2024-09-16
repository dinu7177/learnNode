const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address:{
        type:String,
        required: false    
    }
},{ versionKey: false });

// encrupting username and password
personDetails.pre('save', async function(next){
    const person = this;

    // Hash the password only if it is modified or new
    if(!person.isModified('password')) return next();

    try{
        // hash password generation
        const salt = await bcrypt.genSalt(14);

        // hash password 
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the plain password with the hashed one
        person.password = hashedPassword;

        next()
    }catch(err){
        return next(err);
    }
});

personDetails.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
};

// create devotee model
const  DevoteeEntity = mongoose.model("Devotee", personDetails, "Devotees");
module.exports = DevoteeEntity;