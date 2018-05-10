// config/passport.js
var userApi=require('../models/userApi');
var bcrypt = require('bcrypt-nodejs');
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
//var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
	userApi.getUserByEmail(email, function(err, user){
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'CustEmailAddress',
        passwordField : 'PASSWORD',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists

	userApi.getUserByEmail(email, function(err, user){

            // if there are any errors, return the error
		if (err){
	                return done(err);
		}
            // check to see if theres already a user with that email
            if (!user) {
		console.log("User is :"+user+"!");
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
		
                 var hashPassword = bcrypt.hashSync(req.body.PASSWORD, bcrypt.genSaltSync(8),null);
		 req.body.PASSWORD = hashPassword;
		// save the user
		userApi.createUser(req.body, function(err){
			console.log("returned from createUser to passport.js");		
                	if (err)
                       		 throw err;
                    	return done(null);
                });
            }

        });    

        });

    }));	

 // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    	passport.use('local-login', new LocalStrategy({
        	// by default, local strategy uses username and password, we will override with email
	        usernameField : 'email',
        	passwordField : 'password',
	        passReqToCallback : true // allows us to pass back the entire request to the callback
   	 },

	function(req, email, password, done) {

        // asynchronous
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        userApi.getUserByEmail(req.body.email, function(err, user){

	console.log(user[0].PASSWORD);
            // if there are any errors, return the 
		if (err){
                	return done(err);
                }
            // check to see if theres already a user with that email
           	 if (!user) {
                	return done(null, false, req.flash('loginMessage', 'Email id does not exist'));
            	} else {

	//        	console.log("User is :"+user.body.CustFirstName+"!");
		
			if(!bcrypt.compareSync(password, user[0].PASSWORD)){
				console.log("Incorrect Password");
				return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
			}

		 return done(null, user);
                }
            });

        });

    }));


};
//
