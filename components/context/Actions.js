var Rx = require('rx'),
    Action = require('rx-flux').Action,
    BlogStore = require('../blog/Store'),
    BlogActions = require('../blog/Actions'),
    NavActions = require('../nav/Actions'),
    NavStore = require('../nav/Store'),
    debug = require('debug')('r3dm:context');

var actions = {
  setContext: Action.create(),
  renderToUser: Action.create()
};

actions
  .setContext
  .catch(function(err) {
    debug('setContext experienced an error: ', err);
  });

actions
  .setContext
  .filter(function(ctx) {
    return ctx.state.path.indexOf('/blog') !== -1;
  })
  .subscribe(function(ctx) {
    debug('context;actions;ctx', ctx);
    if (ctx.req && ctx.req.session) {
      BlogActions.setSlug({
        slug: ctx.state.params.slug,
        userId: ctx.req.session.userId
      });
    } else {
      BlogActions.setSlug({ slug: ctx.state.params.slug });
    }
    NavActions.setLinks(ctx.state.path);
    debug('rendering blog');

    waitFor(
      BlogStore
      .first(firstFilter),
      NavStore.first()
    )
      .subscribe(function() {
        actions.renderToUser(ctx);
      });

    function firstFilter(state) {
      return ctx.req ? !state.loading : true;
    }
  });

actions
  .setContext
  .filter(function(ctx) {
    return ctx.state.path.indexOf('/blog') === -1;
  })
  .subscribe(function(ctx) {
    debug('rendering front');
    waitFor(NavStore.first())
      .subscribe(function() {
        actions.renderToUser(ctx);
      });
  });

module.exports = actions;


function waitFor() {
  var observables = [].slice.call(arguments);
  return Rx.Observable
    .combineLatest(observables, function() { return true; })
    .first();
}
