var express = require('express');
var passport = require('passport');
var userApi=require('../models/userApi');

var router = express.Router();

/* GET Signup  page. */

router.get('/', function(req, res, next) {

	res.render('signup');
        if (err){
            res.json(err);
        }
});

   // process the signup form

router.post('/', passport.authenticate('local-signup', {
        successRedirect : '/invoiceOverview', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

/*

router.post('/', function (req,res) {
	console.log('in post');
	console.log(req.body.email);
	console.log(req.body.password);
	res.render('invoiceOverview');
});

*/
module.exports = router;
