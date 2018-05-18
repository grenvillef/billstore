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
        successRedirect : '/login', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

module.exports = router;
