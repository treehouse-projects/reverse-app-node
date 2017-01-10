const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
  response.render('index');
});


function reverseString(string) {
  //Create an array of characters from a string
  const charactersArray = string.split('');
  //Reverse the array
  const reversedCharactersArray = charactersArray.reverse();
  //Join reversed characters back together
  return reversedCharactersArray.join('');
}

app.get('/:userString', (request, response) => {
  //Obtain original user string
  const original = request.params.userString;
  //Reverse the string back
  const reversed = reverseString(original);
  //Send to view
  response.render('reverse', {reversed});
});


// catch 404 and forward to error handler
app.use((req, res, next) =>  {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
