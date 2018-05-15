var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
                user: 'noreply.billstore@gmail.com',
                pass: 'GUNUferns01'
        }
});

var mailOptions = {
        from: 'youremail@gmail.com',
        to: CustEmailAddress,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
 };

var sendResult = transporter.sendMail(mailOptions, function(error, info){
        if (error) {
                 console.log(error);
        } else {
                 console.log('Email sent: ' + info.response);
        }
});


module.exports = sendResult;
