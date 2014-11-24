'use strict';
require('dotenv').load();
require('node-jsx').install();
require('newrelic');
var express = require('express'),
    app = express(),

    // ## Util
    debug = require('debug')('r3dm:server'),

    // ## React
    React = require('react'),
    App = React.createFactory(require('./components/app')),
    state = require('express-state'),

    // ## Flux
    Fetcher = require('fetchr'),
    mandrillServ = require('./services/mandrill'),

    // ## Express/Serve
    morgan = require('morgan'),
    serve = require('serve-static'),
    favicon = require('serve-favicon'),
    body = require('body-parser'),
    compress = require('compression'),
    cookieParse = require('cookie-parser'),
    helmet = require('helmet');
    //coookieSess = require('cookie-session')

// ## State becomes a variable available to all rendered views
state.extend(app);

app.set('port', process.env.PORT || 9000);
app.set('view engine', 'jade');
app.use(helmet());
app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(cookieParse());
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(compress());

// ## Fetcher middleware
Fetcher.registerFetcher(mandrillServ);
app.use('/api', Fetcher.middleware());

app.use(serve('./public'));

app.get('/', function(req, res, next) {
  var html = React.renderToString(App());
  res.render('layout', { html: html }, function(err, markup) {
    if (err) { return next(err); }
    debug('Sending Markup');
    res.send(markup);
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

app.listen(app.get('port'), function() {
  console.log('R3DM is go at ' + app.get('host') + ':' + app.get('port'));
});
