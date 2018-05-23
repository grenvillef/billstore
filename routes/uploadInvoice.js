var express = require('express');
var passport = require('passport');
var uploadInvoice = require('../models/uploadInvoice');
var sendEmail = require('../models/sendEmail');
var fs = require('fs');
var formidable = require('formidable');

var router = express.Router();

module.exports = function(router, passport) {

/* GET upload Invoice  page. */

router.get('/uploadInvoice', isLoggedIn,function(req, res, next) {
	
	res.render('uploadInvoice');
        if (err){
            res.json(err);
        }
});

router.post('/uploadInvoice',isLoggedIn, function (req,res,next) {
	
	uploadInvoice.createInvoice(req, function(err){
		if (err)
	        	res.json(err);//	 throw err;
		else	{
			console.log('before sendEmail');
			console.log(req.user.email);
			sendEmail.invoiceUpload('grenville@gmail.com',function(err){
				if (err)
					res.json(err);
			});
			res.redirect('/invoiceOverview');

		}
	});


});


router.post('/uploadInvoice/file',isLoggedIn, function (req,res,next) {

	var form = new formidable.IncomingForm();
	form.uploadDir = 'public/uploads';
	
	form.keepExtensions = false;
	
	form.parse(req, function (err, fields, files) {
		if (err) 
			res.json(err);
	        console.log('File uploaded and moved!');
	});

	sendEmail.invoiceUpload('grenville@gmail.com',function(err){
		if (err)
			res.json(err);
	});

	res.redirect('/invoiceOverview');

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



