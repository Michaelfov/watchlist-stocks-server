var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var flash = require('connect-flash')

var app = express(); 
//express assigend 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(function(req, res, next){
//   console.log('Custom middleware fired22');
//   next(); 
// })
app.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: 'password',
  cookie: {
    httpOnly: true,
    secure: false
  }
}));
app.use(flash())



app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('password'));



app.use( function(req, res, next){
  console.log('Custom middleware fired2');
  console.log('current session infomation:', req.session);
  next(); 
} ) 

app.use('/', indexRouter);
app.use('/users', usersRouter);


//somehow when I put middleware after router, following functions are not fired. 
//probably no middleware next(). 

//not fired here∆



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
} ); 

// Does the mean every time this error handler used? 
//To make error message and store even though we don't use it.  
//that is whey this middleware was at the end of code. Probably, send it the message made to last middle ware( errorHandler)

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
