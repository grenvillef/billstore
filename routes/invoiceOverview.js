var express = require('express');
var router = express.Router();
var invoiceApi=require('../models/invoiceApi');
var invoiceDetails=require('../models/invoiceDetails');
var postInvoiceApi=require('../models/postInvoiceApi');
/* GET home page. */

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
				console.log("in invoiceOverview route");
				res.render('invoiceOverview',{invoices: rows} );
			}
		});
	}

});



router.post('/:customerId?', function(req, res) {

console.log("reached post in routes");
res.render('index');
/*	 postInvoiceApi.createInvoice(req.params.customerId, function(req, err){
                        if (err){
                                res.json(err);
//                              res.render('index');
                        }
	});
*/
});

module.exports = router;
