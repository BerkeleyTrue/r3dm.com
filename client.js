/* globals window, document */
'use strict';
var React = require('react/addons'),
    App = React.createFactory(require('./components/app')),
    deb = require('debug'),
    debug = deb('r3dm:client');

window.React = React;

if (process.env.development) {
  deb.enable('*');
}

var mountNode = document.getElementById('app');

debug('Rendering component');
React.render(App(), mountNode, function() {
  debug('React rendered!');
});
