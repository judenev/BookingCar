var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors')
var admin = require('./routes/admin.js');
var usersRouter = require('./routes/users');
var db =require('./utils/connections')
const morgan = require('morgan');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//  const corsOptions ={
//    origin:'http://localhost:3002', 
//    credentials:true,            
//    'access-control-allow-credentials':true,
//  optionSuccessStatus:200,  'Access-Control-Allow-Origin': 'http://localhost:3002'
//  } ;
//  app.use(cors(corsOptions));
db.connect((err)=>{
  if(err) console.log("Error Occured");
  else console.log('Connected database');
})
 app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/',admin );
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// if (process.env.NODE_ENV=='development') {
//   app.use(morgan('dev'));
// }
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
