'use strict';
require('dotenv').load();
if (process.env.NODE_ENV !== 'development') {
  require('newrelic');
}
var express = require('express'),
    app = express(),
    keystone = require('keystone'),
    mongoose = require('mongoose'),

    // ## Util
    debug = require('debug')('r3dm:server'),
    utils = require('./utils/utils'),
    path = require('path'),

    // ## React
    React = require('react'),
    Router = require('./components/Router'),
    state = require('express-state'),

    // ## Flux
    Fetcher = require('fetchr'),
    connectService = require('./services/connect'),
    blogService = require('./services/blog'),
    ContextStore = require('./components/context/Store'),
    ContextActions = require('./components/context/Actions'),

    // ## Express/Serve
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

mongoose.connect(process.env.MONGO_URI);
// ## State becomes a variable available to all rendered views
state.extend(app);
app.set('state namespace', 'R3DM');

app.set('port', process.env.PORT || 9000);
app.set('view engine', 'jade');
app.use(helmet());
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));
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

// ## Fetcher middleware
Fetcher.registerFetcher(connectService);
Fetcher.registerFetcher(blogService);
app.use('/api', Fetcher.middleware());

keystone.app = app;
keystone.mongoose = mongoose;
keystone.init({
  'cookie secret': '12345',
  'auth': true,
  'user model': 'User',
  'mongo': process.env.MONGO_URI,
  'session': true,

  'brand': 'The R3DM',
  'emails': 'views/email',
  'mandrill api key': process.env.MANDRILL_KEY,
  'mandrill username': process.env.MANDRILL_USERNAME
});

keystone.import('models');
keystone.static(app);
keystone.routes(app);
keystone.mongoose = mongoose;

app.use(serve('./public'));

app.get('/500', function(req, res) {
  res.render('500');
});

app.get('/emails/:name', function(req, res) {
  var locals = {},
      name = req.params.name,
      nameArr;

  nameArr = name
    .split(' ')
    .map(function(_name) {
      _name = _name.replace(/[^A-Za-z_'-]/gi, '');
      _name = utils.capitalize(_name);
      return _name;
    });

  locals.name = nameArr[0];
  res.render('email/greet', locals);
});

app.get('/*', function(req, res, next) {
  debug('path req', decodeURI(req.path));
  Router(decodeURI(req.path))
    .run(function(Handler, state) {
      Handler = React.createFactory(Handler);

      debug('Route found, %s ', state.path);
      var ctx = {
        req: req,
        res: res,
        next: next,
        Handler: Handler,
        state: state,
        userId: req.session ? req.session.userId : null
      };

      debug('Sending route action');
      ContextActions.setContext(ctx);
    });
});

// Run on next sequence
ContextStore
  .filter(function(ctx) {
    return !!ctx.Handler;
  })
  .subscribe(function(ctx) {

    debug('rendering %s to string', ctx.state.path);
    var html = React.renderToString(ctx.Handler());

    debug('rendering jade');
    ctx.res.render('layout', { html: html }, function(err, markup) {
      if (err) { return ctx.next(err); }
      debug('jade template rendered');

      debug('Sending %s to user', ctx.state.path);
      return ctx.res.send(markup);
    });
  });

app.use(function(req, res) {
  res.status(404);
  res.render(404);
});

/* eslint-disable */
app.use(function(err, req, res, next) { //jshint ignore:line
/* eslint-enable */
  debug('Err: ', err);
  res
    .status(500)
    .send('Something went wrong');
});

// keystone.start();
app.listen(app.get('port'), function() {
  debug('The R3DM is go at: ' + app.get('port'));
  debug(new Date());
});
