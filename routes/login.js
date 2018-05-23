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
	router.get('/auth/google', 
		passport.authenticate('google', 
			{ scope : ['profile', 'email'] }
	));


	router.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/invoiceOverview',
                    failureRedirect : '/login'
            }));

/*

	 router.get('/auth/google/callback', function(req,res,next) {
                console.log('in callback before authenticate');
                passport.authenticate('google',function(err, user, info){
                        console.log('in callback passport authenticate');
                         if (err) { return res.send({'status':'err','message':err.message}); }

                         if (!user) { return res.send({'status':'fail','message':info.message}); }

                         req.logIn(user, function(err) {
                                if (err) { return res.send({'status':'err','message':err.message}); }
                                return res.send({'status':'ok'});
                         });
                        })(req, res, next);


        });


*/

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
