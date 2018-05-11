var express = require('express');
var passport = require('passport');
var invoiceDetails=require('../models/invoiceDetails');

var router = express.Router();

/* GET invoice details */
module.exports = function(router, passport) {

console.log("in invoiceDetails before get");

router.get('/invoiceDetails/:InvoiceId?', isLoggedIn, function(req, res, next) {

console.log("in invoiceDetails after get");


  //      if (req.params.InvoiceId){


                invoiceDetails.getDetailsByInvoice(req.params.InvoiceId, function(err, rows){
                        if (err){
                                res.json(err);
                        }
                        else{
                                res.render('invoiceDetails',{invoiceDetails: rows} );
                        }
                });
/*        }
        else{

                invoiceDetails.getAllInvoiceDetails(function(err,rows){
                        if(err){
                                res.json(err);
                        }
                        else{
//				console.log("in invoiceDetails.js getAllInvoiceDetails");
//				console.log(rows);
                                res.render('invoiceDetails',{invoiceDetails: rows} );
                        }
                });
//        }

*/
});

};

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
                      return next();
    // if they aren't redirect them to the home page
              res.redirect('/login');
        }

//module.exports = router;
