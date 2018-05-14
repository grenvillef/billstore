var express = require('express');
var passport = require('passport');
var uploadInvoice = require('../models/uploadInvoice');
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
	});

	res.redirect('/invoiceOverview');

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
/*
	fs.readFile(req.files.path, function (err, data) {
		  if (err) throw err;
	});
*/
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'grenville@gmail.com',
    pass: 'GUNUferns01'
  }
});

var mailOptions = {
  from: 'grenville@gmail.com',
  to: 'grenville@gmail.com',
  subject: 'New Invoice Uploaded',
  text: 'Your invoice was uploaded successfully!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
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
//module.exports = router;


