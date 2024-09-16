const passport = require('passport'); // for authentication with user name and password
const LocalStrategy = require('passport-local').Strategy; // for authentication with user name and password
const Devotee = require('./models/DevoteeEntity');

// Authentication function
passport.use(new LocalStrategy(async (userName, password, done) => {
    // authentication logic
    try{
        //console.log('Received credentials:',userName,password);
        const user = await Devotee.findOne({username:userName});
        if(!user)
            return done(null, false, {message: "incorrect username"});

        const isPasswordMatch = await user.comparePassword(password); // for encrupted password
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message: "Incorrect password."})
        }
    }catch (err){
        return done(err);
    }
}));

module.exports = passport;