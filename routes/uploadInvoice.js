var express = require('express');
var passport = require('passport');
var uploadInvoice = require('../models/uploadInvoice');

var router = express.Router();


module.exports = function(router, passport) {

/* GET upload Invoice  page. */

router.get('/uploadInvoice', isLoggedIn,function(req, res, next) {
	
	res.render('uploadInvoice');
        if (err){
            res.json(err);
        }
});

router.post('/uploadInvoice', function (req,res,next) {
        console.log('in post uploadInvoice');
        console.log(req.body);

//	 uploadInvoice.createInvoice(req.body, function(err){
//	       	 if (err)
  //              	 throw err;
//        res.render('/invoiceOverview');
//	});

});


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
                      return next();
    // if they aren't redirect them to the home page
                res.redirect('/login');
        }
//module.exports = router;


