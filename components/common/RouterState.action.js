var Rx = require('rx'),
    Action = require('rx-flux').Action,
    BlogAction = require('../blog/Actions'),
    BlogStore = require('../blog/Store'),
    ContextStore = require('./Context.store'),
    debug = require('debug')('r3dm:componentscommon:RouterState');

var RouterState = Action.create();
// Add all subscriptions to array. When ever a new router action
// occurs, unsubscribe by calling dispose on each disposable in array.
var disposable = [];

RouterState.catch(function(err) {
  debug('error occured in RouterState', err);
});

// RouterAction only happens when a route changes
// This activates and stores that need to change
// their information before a route transition happens.
RouterState.subscribe(function(ctx) {

  // TODO: Test to see if this is scalable.
  // i.e. If there are a ton of request, do subscriptions get prematurely
  // disposed?
  // Maybe use an hash of arrays with id's per request on server?
  disposable.forEach(function(subscription) {
    subscription.dispose();
  });
  var state = ctx.state;
  debug('router state', state.path);

  if (state.path.indexOf('/blog') !== -1) {
    var title = state.params.title;
    debug('calling blog action');
    BlogAction({ title: title });

    // Using first here unsubscribes after the first payload
    // That is not in state 'loading'.
    // This prevents response object from leaking after it has been
    // completed in the server.
    // TODO: unsubscribe on error
    var source = Rx.Observable.if(
      function() { return !!ctx.res; },
      BlogStore.first(function(payload) {
        debug('state of loading is %s..', payload.loading);
        return !payload.loading;
      }),
      BlogStore
    );
    var subscription = source
      .catch(function(err) {
        debug('an error occured durrung context action', err);
      })
      .subscribe(function() {
        debug('context operation for blog');

        // At this point the blog has been updated
        // Call ContextStore operation to initiate render sequence
        ContextStore.operation.onNext({ value: ctx });
      });
    disposable.push(subscription);
  } else {
    debug('context operation for frontFace');
    ContextStore.operation.onNext({ value: ctx });
  }
});

module.exports = RouterState;
