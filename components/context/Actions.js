var Action = require('rx-flux').Action,
    BlogStore = require('../blog/Store'),
    BlogActions = require('../blog/Actions'),
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
    BlogActions.setTitle({ title: ctx.state.params.title });
    debug('rendering blog');

    BlogStore
      .first(function(state) {
        return ctx.req ? !state.loading : true;
      })
      .subscribe(function() {
        actions.renderToUser(ctx);
      });

  });

actions
  .setContext
  .filter(function(ctx) {
    return ctx.state.path.indexOf('/blog') === -1;
  })
  .subscribe(function(ctx) {
    debug('rendering front');
    actions.renderToUser(ctx);
  });

module.exports = actions;
