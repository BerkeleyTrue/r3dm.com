'use strict';
var React = require('react/addons'),
    getRouter = require('./components/routes'),

    HistoryLocation = require('react-router').HistoryLocation,

    ContextStore = require('./components/common/Context.store'),
    RouterStateAction = require('./components/common/RouterState.action'),
    debug = require('debug')('r3dm:client');

var mountNode = document.getElementById('app');

debug('Matching Route');

ContextStore.subscribe(function(ctx) {
  if (!ctx.Handler) { return debug('no handler'); }
  React.render(ctx.Handler(), mountNode, function() {
    debug('React rendered!');
  });
});

getRouter(HistoryLocation)
  .run(function(Handler, state) {
    debug('Route found, %s rendering..', state.path);
    Handler = React.createFactory(Handler);
    var ctx = {
      Handler: Handler,
      state: state
    };
    RouterStateAction(ctx);
  });

