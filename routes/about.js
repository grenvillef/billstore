var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET About page. */

module.exports = function(router, passport) {
	console.log("in about before get");
	router.get('/about',isLoggedIn,function(req, res,next) {

		console.log("in about after get");

		res.render('about');
	});
};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
  		      return next();
    // if they aren't redirect them to the home page
  		      return next();
	}
//module.exports = router;
