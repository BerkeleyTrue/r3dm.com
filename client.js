/* globals window, document */
'use strict';
var App = require('./components/app'),
    React = require('react/addons'),
    deb = require('debug'),
    debug = deb('r3dm:client');

window.React = React;

if (process.env.development) {
  deb.enable('*');
}

var mountNode = document.getElementById('app');

debug('Rendering component');
React.renderComponent(App(), mountNode, function() {
  debug('React rendered!');
});
