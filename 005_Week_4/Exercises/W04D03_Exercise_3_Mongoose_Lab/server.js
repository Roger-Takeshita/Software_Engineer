var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let methodOverride = require('method-override');                    //+ Require the method-override packages

require("./config/database");                                       //+ Connect to the database with mongoose
var indexRouter = require('./routes/routersIndex');
var flightsRouter = require('./routes/routersFlight');

var app = express();

app.use("/styles", express.static(__dirname + '/styles'));          //+ Static - Public CSS
// view engine setup
app.set('views', path.join(__dirname, 'views'));                    //+ Set the view directory, so we can render our ejs files
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));                                 //+ Middleware - method-override


app.use('/', indexRouter);                                          //+ Index middleware
app.use('/flights', flightsRouter);                                 //+ Router middleware

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
