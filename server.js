'use strict';
require('node-jsx').install();
var express = require('express'),
    app = express(),
    // ## Util
    debug = require('debug')('r3dm:server'),
    // ## React
    React = require('react'),
    App = require('./components/app'),
    state = require('express-state'),

    // ## Express/Serve
    morgan = require('morgan'),
    serve = require('serve-static'),
    favicon = require('serve-favicon'),
    body = require('body-parser'),
    compress = require('compression'), //May not be needed
    cookieParse = require('cookie-parser');
    //coookieSess = require('cookie-session')

// ## State becomes a variable available to all
// rendered views
state.extend(app);
app.set('port', (process.env.PORT || 9000));
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(cookieParse());
app.use(body.urlencoded());
app.use(body.json());
app.use(compress());

app.get('/', function(req, res, next) {
  var html = React.renderComponentToString(App());
  res.render('layout', { html: html }, function(err, markup) {
    if (err) { return next(err); }
    debug('Sending Markup');
    res.send(markup);
  });
});


app.use(serve('./public'));

app.use(function(req, res) {
  res.status(404);
  res.render(404);
});

app.use(function(err, req, res, next) {
  debug('Err: ', err);
  res
    .status(500)
    .send('Something went wrong');
});

app.listen(app.get('port'), function() {
  console.log('node app is up and running at localhost:' + app.get('port'));
});
