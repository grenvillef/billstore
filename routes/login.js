var express = require('express');
var passport = require('passport');
var userApi=require('../models/userApi');

var router = express.Router();

module.exports = function(router, passport) {

/* GET login page. */

	router.get('/login', function(req, res, next) {

		res.render('login', { message: req.flash('loginMessage') }); 
		//res.render('login');
	        if (err){
	            res.json(err);
        	}
	});

// =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
	router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
	router.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/invoiceOveview',
                    failureRedirect : '/'
        }));





	router.post('/login', passport.authenticate('local-login', {
        	successRedirect : '/invoiceOverview', // redirect to the secure profile section
	        failureRedirect : '/login', // redirect back to the signup page if there is an error
	        failureFlash : true // allow flash messages
	 }));

	router.get('/logout', function(req, res) {
	        req.logout();
	        res.redirect('/');
    });


};



//module.exports = router;
