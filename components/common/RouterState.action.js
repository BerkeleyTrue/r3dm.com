var debug = require('debug')('r3dm:common:RouterState'),
    Action = require('rx-flux').Action,
    BlogAction = require('../blog/blog.action'),
    BlogStore = require('../blog/blog.store'),
    ContextStore = require('./Context.store');

var RouterState = Action.create();

RouterState.subscribe(function(ctx) {
  var state = ctx.state;
  debug('router state', state.path);
  if (state.path.indexOf('/blog') !== -1) {
    var title = state.params.title;
    debug('calling blog action');
    BlogAction({ title: title });
    BlogStore.subscribe(function() {
      debug('context operation');
      ContextStore.operation.onNext({ value: ctx });
    });
  } else {
    debug('context operation');
    ContextStore.operation.onNext({ value: ctx });
  }
});

module.exports = RouterState;
