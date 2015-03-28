'use strict';
require('dotenv').load();
require('babel/register');
if (process.env.NODE_ENV !== 'development') {
  require('newrelic');
}
var express = require('express'),
    path = require('path'),
    connectMongo = require('./boot/connectMongo'),
    connectKeystone = require('./boot/connectKeystone'),
    initMiddleware = require('./boot/initMiddleware'),
    generateSitemap = require('./boot/generateSitemap'),

    // ## Util
    debug = require('debug')('r3dm:server'),
    utils = require('./utils/utils'),

    // ## React
    React = require('react'),
    Router = require('../components/Router'),
    state = require('express-state'),

    // ## Flux
    Fetcher = require('fetchr'),
    connectService = require('./services/connect'),
    blogService = require('./services/blog'),
    ContextStore = require('../components/context/Store'),
    ContextActions = require('../components/context/Actions');

var app = express();
var mongoose = connectMongo();
// ## State becomes a variable available to all rendered views
state.extend(app);
app.set('state namespace', 'R3DM');
app.set('port', process.env.PORT || 9000);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');

// ## Fetcher middleware
Fetcher.registerFetcher(connectService);
Fetcher.registerFetcher(blogService);

initMiddleware(app, mongoose);
app.use('/api', Fetcher.middleware());
connectKeystone(app, mongoose);
generateSitemap(app);

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

      debug('context action');
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
app.use(function(err, req, res, next) {
/* eslint-enable */
  debug('Err: ', err);
  res
    .status(500)
    .send('Something went wrong');
});

app.listen(app.get('port'), function() {
  debug('The R3DM is go at: ' + app.get('port'));
  debug(new Date());
});
