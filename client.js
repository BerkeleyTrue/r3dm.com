'use strict';
var React = require('react/addons'),
    Router = require('./components/Router'),

    HistoryLocation = require('react-router').HistoryLocation,

    ContextStore = require('./components/common/Context.store'),
    RouterStateAction = require('./components/common/RouterState.action'),
    debug = require('debug')('r3dm:client');

var mountNode = document.getElementById('app');

debug('Matching Route');

ContextStore
  .filter(function(ctx) {
    return !!ctx.Handler;
  })
  .subscribe(function(ctx) {
    debug('rendering %s...', ctx.state.path);
    React.render(ctx.Handler(), mountNode, function() {
      debug('React rendered!');
    });
  });

Router(HistoryLocation)
  .run(function(Handler, state) {

    debug('Route found, %s rendering..', state.path);
    Handler = React.createFactory(Handler);
    var ctx = {
      Handler: Handler,
      state: state
    };
    RouterStateAction(ctx);
  });
