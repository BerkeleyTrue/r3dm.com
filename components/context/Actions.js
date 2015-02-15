var Rx = require('rx'),
    createActions = require('../util/createActions'),
    BlogStore = require('../blog/Store'),
    BlogActions = require('../blog/Actions'),
    NavActions = require('../nav/Actions'),
    NavStore = require('../nav/Store'),
    debug = require('debug')('r3dm:context');

var actions = createActions([
  'setContext',
  'renderToUser'
]);

actions
  .setContext
  .filter(function(ctx) {
    return ctx.state.path.indexOf('/blog') !== -1;
  })
  .subscribe(function(ctx) {
    debug('set ctx');

    waitFor(BlogStore.first(firstFilter))
      .subscribe(function() {
        debug('render blog to user', '\n');
        actions.renderToUser(ctx);
      });

    debug('set links', '\n');
    NavActions.setLinks(ctx.state.path);
    debug('set show nav at top', '\n');
    NavActions.setShowNavAtTop(true);

    debug('set slug', '\n');
    BlogActions.setSlug({
      slug: ctx.state.params.slug,
      userId: ctx.userId
    });

    function firstFilter(state) {
      var pass;
      if (ctx.req) {
        // we are on the server
        // if loading don't pass
        // if not loading
        //  if error pass
        //  if posts is array and larger then zero pass
        //  if posts if false value then pass
        pass = !state.loading &&
          (state.error ||
          (Array.isArray(state.posts) &&
           state.posts.length > 0) ||
           !state.posts);
      } else {
        // we are on the client,
        // no filtering necessary
        pass = true;
      }
      return pass;
    }
  });

actions
  .setContext
  .filter(function(ctx) {
    return ctx.state.path.indexOf('/blog') === -1;
  })
  .subscribe(function(ctx) {

    NavActions.setShowNavAtTop(false);
    waitFor(NavStore)
      .subscribe(function() {
        debug('rendering front');
        actions.renderToUser(ctx);
      });

    debug('set links');
    NavActions.setLinks(ctx.state.path);
  });

module.exports = actions;

// take an array of observables
// convert them to hot observables
// then wait for each one to publish a value
// returns an observable
function waitFor(observables) {
  observables = [].slice.call(arguments);
  debug('setting waitFor');
  return Rx.Observable.combineLatest(
    observables.map(function(obs) {
      var published = obs.publish();
      published.connect();
      return published;
    }),
    function() {
      debug('waitFor complete');
      return true;
    }
  )
  // only listen for one value
    .firstOrDefault();
}
