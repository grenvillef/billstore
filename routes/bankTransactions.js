var express = require('express');
var router = express.Router();
var passport = require('passport');

var bankTransactionsApi=require('../models/bankTransactionsApi');

/* GET home page. */

module.exports = function(router, passport) {

router.get('/bankTransactions', isLoggedIn, function(req, res,next) {

		bankTransactionsApi.getBankTransactions(req.user[0].CustomerId, function(err, rows){
			if (err){
				res.json(err);
			}
			else{

				router.locals.locvarCustFirstName = req.user[0].CustFirstName;
				router.locals.locvarCustomerId = req.user[0].CustomerId;
					console.log('in bankTransactions'+ req.user[0].CustomerId);
					console.log(rows);

					res.render('bankTransactions',{bankTransactions: rows} );
			}
		});
});
};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
	if (req.isAuthenticated()){
  		      return next();
	}
    // if they aren't redirect them to the home page
    		res.redirect('/login');
	}
//module.exports = router;
