var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// jwt verification
let { expressjwt } = require('express-jwt')


// set routers for users and articles
var articlesRouter = require('./routes/articles.js');
var usersRouter = require('./routes/users.js');
var uploadRouter = require('./routes/upload.js');
var commentRouter = require('./routes/comments.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// jwt use
app.use(expressjwt({
  secret: 'test12345',
  algorithms: ['HS256']
}).unless({
  // those pathes below, no need for token verify
  path: [
    '/api/users',
    // /api/articles/users/:uid
    /^\/api\/articles\/users\/\w+/,
    {
      // /api/articles/:aid (GET)
      url : /^\/api\/articles\/\w+/,
      methods : ['GET'],
    },
  ],
}))

// use routers for users and articles, upload
app.use('/api/articles', articlesRouter);
app.use('/api/users', usersRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/comments', commentRouter);

// jwt verification error handler
app.use((err, req, res, next) => {
  if(err.name === "UnauthorizedError") {
    res
      .status(401)
      .json({
        code : 0,
        msg : "Unavailable token -- please reattempt"
      })
  } else {
    next(err)
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

module.exports = app;
