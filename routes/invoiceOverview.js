var express = require('express');
var router = express.Router();
var passport = require('passport');

var invoiceApi=require('../models/invoiceApi');
var invoiceDetails=require('../models/invoiceDetails');
var postInvoiceApi=require('../models/postInvoiceApi');
/* GET home page. */

//module.exports = function(app, passport) {
//router.get('/:customerId?',isLoggedIn, function(req, res, next) {

router.get('/:customerId?', function(req, res, next) {

	if (req.params.customerId){


		invoiceApi.getInvoiceByCustomer(req.params.customerId, function(err, rows){
			if (err){
				res.json(err);
			}
			else{
				res.render('invoiceOverview',{invoices: rows} );
			}
		});
	}
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

});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
