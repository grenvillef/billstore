var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: 'noreply.billstore@gmail.com',
                pass: 'GUNUferns01'
        }
});


var sendEmail = {

	invoiceUpload: function (CustEmailAddress, callback){

		var mailOptions = {
		        from: 'noreply.billstore@gmail.com',
       			to: CustEmailAddress,
		        subject: 'New Invoice uploaded',
		        text: 'Your invoice was uploaded successfully'
		 };

		var sendResult = transporter.sendMail(mailOptions, function(error, info){
        		if (error) {
		                 console.log(error);
		        } else {
                		 console.log('Email sent: ' + info.response);
        		}
		});
		return sendResult;
	},

	newUser: function (CustEmailAddress, callback){

                var mailOptions = {
                        from: 'noreply.billstore@gmail.com',
                        to: CustEmailAddress,
                        subject: 'Welcome to Billstore',
                        text: 'Welcome to Billstore. Click here to login: www.billstore.nl:3000'
                 };

                var sendResult = transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                                 console.log(error);
                        } else {
                                 console.log('Email sent: ' + info.response);
                        }
                });
                return sendResult;
        }





};


module.exports = sendEmail;


