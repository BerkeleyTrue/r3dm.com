/* globals  document */
'use strict';
var React = require('react/addons'),
    App = React.createFactory(require('./components/app')),
    deb = require('debug'),
    debug = deb('r3dm:client');

var mountNode = document.getElementById('app');

debug('Rendering component');
React.render(App(), mountNode, function() {
  debug('React rendered!');
});
