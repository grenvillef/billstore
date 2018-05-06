var createError = require('http-errors');
var express = require('express');
var path = require('path');
var helpers = require('express-helpers')(app);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 
/* These are the new imports we're adding:
var logger = require('morgan');
var favicon = require('static-favicon');
var passport = require('passport');
var StormpathStrategy = require('passport-stormpath');
var session = require('express-session');
var flash = require('connect-flash');
*/

var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var invoiceApi = require('./routes/index');
var invoiceDetails = require('./routes/invoiceDetails');
var postInvoiceApi = require('./routes/index');
var app = express();

/*
// Here is what we're adding:
var strategy = new StormpathStrategy();
passport.use(strategy);
passport.serializeUser(strategy.serializeUser);
passport.deserializeUser(strategy.deserializeUser);


//app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
 
// Stuff we're adding:
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  key: 'sid',
  cookie: { secure: false },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
*/


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/invoiceApi',invoiceApi);
app.use('/invoiceDetails',invoiceDetails);
app.use('/postInvoiceApi',postInvoiceApi);
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;
