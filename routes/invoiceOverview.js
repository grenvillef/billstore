var express = require('express');
var router = express.Router();
var passport = require('passport');

var invoiceApi=require('../models/invoiceApi');
var invoiceDetails=require('../models/invoiceDetails');
/* GET home page. */

module.exports = function(router, passport) {

router.get('/invoiceOverview', isLoggedIn, function(req, res,next) {

	console.log(req.user[0].CustomerId);
//	if (isLoggedIn(req,res,next)){


		invoiceApi.getInvoiceByCustomer(req.user[0].CustomerId, function(err, rows){
			if (err){
				res.json(err);
			}
			else{
				res.render('invoiceOverview',{invoices: rows} );
			}
		});
/*	}
	else{
	
		invoiceApi.getAllInvoices(function(err,rows){
			if(err){
				res.json(err);
			}
			else{
//				res.render('invoiceOverview',{user:req.user});

				res.render('invoiceOverview',{invoices: rows} );
			}
		});
	}


*/
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
