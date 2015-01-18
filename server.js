'use strict';
require('dotenv').load();
require('newrelic');
var express = require('express'),
    app = express(),
    keystone = require('keystone'),
    mongoose = require('mongoose'),

    // ## Util
    debug = require('debug')('r3dm:server'),
    utils = require('./utils/utils'),

    // ## React
    React = require('react'),
    getRouter = require('./components/routes'),
    state = require('express-state'),

    // ## Flux
    Fetcher = require('fetchr'),
    mandrillServ = require('./services/mandrill'),
    blogServ = require('./services/blog'),
    ContextStore = require('./components/common/Context.store'),
    RouterStateAction = require('./components/common/RouterState.action'),

    // ## Express/Serve
    morgan = require('morgan'),
    serve = require('serve-static'),
    favicon = require('serve-favicon'),
    body = require('body-parser'),
    multer = require('multer'),
    compress = require('compression'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    flash = require('connect-flash'),
    helmet = require('helmet');

// ## State becomes a variable available to all rendered views
state.extend(app);
app.set('state namespace', 'R3DM');

app.set('port', process.env.PORT || 9000);
app.set('view engine', 'jade');
app.use(helmet());
app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(cookieParser('12345'));
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.use(multer());
app.use(compress());
app.use(flash());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// ## Fetcher middleware
Fetcher.registerFetcher(mandrillServ);
Fetcher.registerFetcher(blogServ);
app.use('/api', Fetcher.middleware());

keystone.app = app;
keystone.mongoose = mongoose;
keystone.init({
  'cookie secret': '12345',
  'auth': true,
  'user model': 'User',
  'mongo': process.env.MONGO_URI,
  'session': true
});

keystone.import('models');
keystone.static(app);
keystone.routes(app);
keystone.mongoose.connect(keystone.get('mongo'));

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
  debug('req', req.path);
  debug('decode req', decodeURI(req.path));
  getRouter(decodeURI(req.path))
    .run(function(Handler, state) {
      Handler = React.createFactory(Handler);
      debug('Route found, %s ', state.path);

      var ctx = {
        req: req,
        res: res,
        next: next,
        Handler: Handler,
        state: state
      };
      debug('Sending route action');
      RouterStateAction(ctx);
    });
});

ContextStore.subscribe(function(ctx) {
  if (!ctx.Handler) { return debug('no handler'); }
  debug('rendering react to string', ctx.state.path);
  var html = React.renderToString(ctx.Handler());
  debug('rendering jade');

  ctx.res.render('layout', { html: html }, function(err, markup) {
    if (err) { return ctx.next(err); }

    debug('Sending %s', ctx.state.path);
    return ctx.res.send(markup);
  });
});

app.use(function(req, res) {
  res.status(404);
  res.render(404);
});

app.use(function(err, req, res, next) { //jshint ignore:line
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
