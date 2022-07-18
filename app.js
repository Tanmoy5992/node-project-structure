//require('dotenv').config()
require('dotenv').config({ path: `./env/development.env` })
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require("helmet");
const cookieSession = require('cookie-session');
const sequelizeConnection = require('./config/connection');

var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge:  3600 * 9000 // 9hr save cookie
}));

if(process.env.NODE_ENV === 'development'){
  app.use(logger('dev'));
}

if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'){
  app.use(helmet());
}


app.get('/health',(req,res) => {
  return res.status(200).json({'status':true});
});

app.use('/api/', indexRouter);


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
