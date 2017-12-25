var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var main = require('./routes/main');
var items = require('./routes/items');
var agreement = require('./routes/agreement');
var contractapi = require('./routes/contractapi');
var hostmanage = require('./routes/hostmanage');
var contracttest = require('./routes/contracttest');

var app = express();
var port = 3000

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//express-session setting
app.use(session({
  secret: 'anything',
  resave: false,
  saveUninitialized: true
}));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/main', main);
app.use('/items', items);
app.use('/agreement', agreement);
app.use('/contractapi', contractapi);
app.use('/hostmanage', hostmanage);
app.use('/contracttest', contracttest);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function (err) {
  if (err)
    console.log(err)
})

module.exports = app;