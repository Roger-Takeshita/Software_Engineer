var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');              //! Require session package below cookie-parser
const passport = require('passport');                    //! Require passport package -  AFTER session (alwyas)
var logger = require('morgan');

var indexRouter = require('./routes/index');
var studentsRouter = require('./routes/students');

require('dotenv').config();                             //! Require Dotenv
require('./config/database');                           //! Require MongoDB Database
require('./config/passport');                           //! Require our passport file after database
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({                                       //! Session middleware, mount AFTER cookieParser();
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());                         //! Passport middleware, mount AFTER session (always)
app.use(passport.session());                            //! Passport middleware, mount AFTER session (always)
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  console.log(req.user);
  next();
});

app.use('/', indexRouter);
app.use('/', studentsRouter);

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
  res.render('error');
});

module.exports = app;
