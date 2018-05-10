var express = require('express');
var passport = require('passport');
var userApi=require('../models/userApi');

var router = express.Router();


/* GET login page. */

router.get('/', function(req, res, next) {

	res.render('login');
        if (err){
            res.json(err);
        }
});

router.post('/', passport.authenticate('local-login', {
        successRedirect : '/invoiceOverview', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


module.exports = router;
