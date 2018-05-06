var express = require('express');
var router = express.Router();
var invoiceApi=require('../models/invoiceApi');
var invoiceDetails=require('../models/invoiceDetails');
var postInvoiceApi=require('../models/postInvoiceApi');
/* GET home page. */

router.get('/', function(req, res, next) {

	res.render('index');
        if (err){
            res.json(err);
        }
});

module.exports = router;
