var express = require('express');
var router = express.Router();
var invoiceDetails=require('../models/invoiceDetails');

/* GET home page. */

router.get('/:InvoiceId?', function(req, res, next) {

        if (req.params.InvoiceId){


                invoiceDetails.getDetailsByInvoice(req.params.InvoiceId, function(err, rows){
                        if (err){
                                res.json(err);
                        }
                        else{
                                res.render('invoiceDetails',{invoiceDetails: rows} );
                        }
                });
        }
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
        }

});



module.exports = router;
