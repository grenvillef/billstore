// config/passport.js
var userApi=require('../models/userApi');
var sendEmail=require('../models/sendEmail');
var bcrypt = require('bcrypt-nodejs');
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
//var User = require('../app/models/user');

// expose this function to our app using module.exports

// load the auth variables
var configAuth = require('./auth');

module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
	console.log("in serializeUser"+user[0].CustomerId);
        done(null, user[0].CustomerId);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
	userApi.getUserById(id, function(err, user){
		console.log("in deserializeUser"+user[0].CustomerId);
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
        	return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
		
        	var hashPassword = bcrypt.hashSync(req.body.PASSWORD, bcrypt.genSaltSync(8),null);
		req.body.PASSWORD = hashPassword;
		// save the user
		userApi.createUser(req.body, function(err){
                	if (err)
                       		 throw err;
                	else {
				sendEmail.newUser(req.body.CustEmailAddress, function(err) {
					if (err)
						throw err;
				});			
			 	return done(null);

        		}
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
		
            // if there are any errors, return the 
		if (err){
                	return done(err);
                }
           // check to see if theres already a user with that email
		
           	 if (!user.length) {
                	return done(null, false, req.flash('loginMessage', 'Sorry, we do not have an account with this email address. Please click on the link further below to sign up'));
            	} else {


			if(!bcrypt.compareSync(password, user[0].PASSWORD)){
				console.log("Incorrect Password");
				return done(null, false, req.flash('loginMessage', 'Incorrect email addres / password combination. Please try again'));
			}

		 return done(null,user);
                }
            });

        });

    }));

//Google Login

	passport.use(new GoogleStrategy({

        	clientID        : configAuth.googleAuth.clientID,
	        clientSecret    : configAuth.googleAuth.clientSecret,
	        callbackURL     : configAuth.googleAuth.callbackURL,

    	},
	function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        	process.nextTick(function() {

			console.log(profile.id);
			userApi.getUserByEmail(profile.id, function(err, user){

        		// if there are any errors, return the
                		if (err){
                        		return done(err);
                		}
	          	 // check to see if theres already a user with that email

	                	if (!user.length) {
        		        	return done(null, false, req.flash('loginMessage', 'Sorry, we do not have an account with this email address. Please click on the link further below to sign up'));
               			} else {
					return done(null,user);
				}




/*            // try to find the user based on their google id
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
       


	             var newUser          = new User();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
*/            });
        });

    }));


};
//
