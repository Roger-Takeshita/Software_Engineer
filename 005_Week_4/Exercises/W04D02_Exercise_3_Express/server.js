//!          ,pP"Ybd  .gP"Ya  `7Mb,od8 `7M'   `MF' .gP"Ya  `7Mb,od8 
//!          8I   `" ,M'   Yb   MM' "'   VA   ,V  ,M'   Yb   MM' "' 
//!          `YMMMa. 8M""""""   MM        VA ,V   8M""""""   MM     
//!          L.   I8 YM.    ,   MM         VVV    YM.    ,   MM     
//!          M9mmmP'  `Mbmmd' .JMML.        W      `Mbmmd' .JMML.   

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');

// let loghi = require('./middleware/log-hi');

var indexRouter = require('./routes/index');
var todosRouter = require('./routes/todos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// app.use(loghi);

app.use(function(req, res, next) {
  console.log('Hello SEI');
  // perform other functionality
  next();
});

app.use((req, res, next) => {
  req.time = new Date().toLocaleTimeString();
  next();
});

app.use('/', indexRouter);
app.use('/todos', todosRouter);

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
