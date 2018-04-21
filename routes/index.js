var express = require('express');
var router = express.Router();
var invoiceApi=require('../models/invoiceApi');
/* GET home page. */

router.get('/:customerId?', function(req, res, next) {

	if (req.params.customerId){


		invoiceApi.getInvoiceByCustomer(req.params.customerId, function(err, rows){
			if (err){
				res.json(err);
//				res.render('index');
			}
			else{
				console.log(rows);
				res.render('index',{invoices: rows} );
			}
		});
	}
	else{

		invoiceApi.getAllInvoices(function(err,rows){
			if(err){
				res.json(err);
			}
			else{
				res.render('index',{invoices: rows} );
//				res.json(rows);
			}
		});
	}

});
	
module.exports = router;
