var createError = require('http-errors');
var express = require('express');
var path = require('path');
var helpers = require('express-helpers')(app);

var stormpath = require('express-stormpath');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var invoiceOverviewRouter = require('./routes/invoiceOverview');
var invoiceDetailsRouter = require('./routes/invoiceDetails');
var postInvoiceApi = require('./routes/index');


var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());




app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/invoiceOverview',invoiceOverviewRouter);
app.use('/invoiceDetails',invoiceDetailsRouter);





//app.use('/postInvoiceApi',postInvoiceApi);
//app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {

  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
//  res.render('error');
});

const oidc = new ExpressOIDC({
  issuer: 'https://dev-360153.oktapreview.com/oauth2/default',
  client_id: '0oaewznt08Twwz0ZX0h7',
  client_secret: 'RWz2iBs9PMBDKzX0U0GMB9sYPCWaLHGZIirfWiXO',
  redirect_uri: 'http://ec2-35-180-74-148.eu-west-3.compute.amazonaws.com:3000/invoiceOverview',
  scope: 'openid profile'
});

/*
app.use(stormpath.init(app, {
  application: {
    href: process.env['STORMPATH_APPLICATION_HREF']},
  web: {
    login: {
      nextUri: '/invoiceOverview',
    },
    oauth2: {
      client_credentials: {
        accessToken: {
          ttl: 3600
        }
      }
    }
  }
}));

*/

module.exports = app;
