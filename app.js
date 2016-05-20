var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var moment = require('moment');
var mongoStore = require('connect-mongo')(session);
var Category = require('./models/category');
var dbUrl = "mongodb://hjml69351:hjml69293@ds041394.mlab.com:41394/user";
// var dbUrl = "mongodb://localhost/ap1";

mongoose.connect(dbUrl)



var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'bn',
  store:new mongoStore({
    url:dbUrl,
    collection:'sessions'
  })
}))

app.use(function(req, res, next) {
  var _user = req.session.user;

  app.locals.user = _user;

  next();
});

routes(app);
// app.use('/user', user);
// app.use('/admin',admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var categorys = ['html','css','javascript','jquery','nodejs','angularjs','other'];

function addCategorys(){
  addCate(categorys[0]);
  addCate(categorys[1]);
  addCate(categorys[2]);
  addCate(categorys[3]);
  addCate(categorys[4]);
  addCate(categorys[5]);
  addCate(categorys[6]);
}

function addCate(name){
  Category.findOne({name: name}, function (err, category) {
        if (category) {

        } else {
          category = new Category({
            name: name
          });
          category.save(function (err, category) {
            console.log(category)
          })
        }
      })
}

addCategorys();

app.locals.moment = moment;

module.exports = app;
