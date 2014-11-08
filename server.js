'use strict';
require('dotenv').load();
require('node-jsx').install();
require('newrelic');
var express = require('express'),
    app = express(),

    // ## Keystone
    mongoose = require('mongoose'),
    keystone = require('keystone').connect(mongoose, app),
    keystoneInit = require('./keystone'),

    // ## Util
    debug = require('debug')('r3dm:server'),

    // ## React
    React = require('react'),
    App = require('./components/app'),
    state = require('express-state'),

    // ## Express/Serve
    serve = require('serve-static'),
    favicon = require('serve-favicon'),
    body = require('body-parser'),
    compress = require('compression'),
    cookieParse = require('cookie-parser'),
    helmet = require('helmet');
    //coookieSess = require('cookie-session')

// ## State becomes a variable available to all rendered views
state.extend(app);

// ## keystone setup
app = keystoneInit(keystone);
app.pre('routes', helmet());
app.pre('routes', favicon(__dirname + '/public/images/favicon.ico'));
app.pre('routes', cookieParse());
app.pre('routes', body.urlencoded({ extended: true }));
app.pre('routes', body.json());
app.pre('routes', compress());
app.pre('routes', serve('./public'));

app.set('routes', function(app) {
  app.get('/', function(req, res, next) {
    var html = React.renderComponentToString(App());
    res.render('layout', { html: html }, function(err, markup) {
      if (err) { return next(err); }
      debug('Sending Markup');
      res.send(markup);
    });
  });
});

app.set('404', function(req, res) {
  res.status(404);
  res.render(404);
});

app.set('500', function(err, req, res, next) { //jshint ignore:line
  debug('Err: ', err);
  res
    .status(500)
    .send('Something went wrong');
});

keystone.start();
