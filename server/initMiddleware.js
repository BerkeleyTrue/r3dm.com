var path = require('path'),
    morgan = require('morgan'),
    serve = require('serve-static'),
    favicon = require('serve-favicon'),
    body = require('body-parser'),
    multer = require('multer'),
    compress = require('compression'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    helmet = require('helmet');

module.exports = function initMiddleware(app, mongoose) {
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(favicon(path.join(__dirname, '../public/images/favicon.ico')));
  app.use(cookieParser('12345'));
  app.use(body.urlencoded({ extended: false }));
  app.use(body.json());
  app.use(multer());
  app.use(compress());
  app.use(flash());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));
  app.use(serve(path.join(__dirname, '../public')));
};
