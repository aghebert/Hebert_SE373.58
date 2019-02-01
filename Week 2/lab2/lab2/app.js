var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(__dirname + "/public"));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/index', (req, res) => {
  res.render("index.pug", {title:"Index: Lab 2:"});
});

app.get('/form', (req, res) => {
  res.render('form', {title:"Form Page"});
});

app.get('/about', (req, res) => {
  res.render('about', {title:"About Me"});
});

app.get('/submitpage', (req, res) => {
  let name = req.query.name;
  let email = req.query.email;
  let comments = req.query.comments;
  res.render('submitpage', {title:"Submit Page", name:name, email:email, comments:comments});
});

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
