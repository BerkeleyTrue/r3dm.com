var Store = require('rx-flux').Store,
    debug = require('debug')('r3dm:blog:store');

var BlogStore = Store.create({
  getInitialValue: function() {
    debug('setting initial value');
    return {
      loading: false,
      error: false,
      posts: []
    };
  }
});

module.exports = BlogStore;
