

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var helpers = require('express-helpers')(app);

var passport = require('passport');

require('./config/passport')(passport); 

var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var morgan      = require('morgan');
var formidable = require('formidable');

var logger = require('morgan');
var cors = require('cors');


var bankConnectRouter = require('./routes/bankConnect');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var invoiceOverviewRouter = require('./routes/invoiceOverview');
var invoiceDetailsRouter = require('./routes/invoiceDetails');
var uploadInvoiceRouter = require('./routes/uploadInvoice');
var bankTransactionsRouter = require('./routes/bankTransactions');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('uploads', path.join(__dirname, 'public/uploads'));
app.set('view engine', 'ejs');



app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)


app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
     extended: true
})); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
//require('./app/routes.js')(app, passport);

app.use(cors());

// Define the routes

require('./routes/login.js')(app, passport);
require('./routes/invoiceOverview.js')(app, passport);
require('./routes/invoiceDetails.js')(app, passport);
require('./routes/about.js')(app, passport);
require('./routes/uploadInvoice.js')(app, passport);
require('./routes/bankTransactions.js')(app, passport);



app.use('/bankConnect',bankConnectRouter);
app.use('/', indexRouter);
app.use('/signup',signupRouter);

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


