var Q = require('q'),
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:fetchData');

module.exports = function(state) {
  var defer = Q.defer();
  debug('state', state);
  if (state.path.indexOf('/blog') !== -1) {
    var title = state.params.title;
    debug('fetching blog data');
    var fetcher = new Fetcher({
      xhr: '/api'
    });
    fetcher.read('blogService', {
      title: title || ''
    }, {}, function(err, posts) {
      if (err) { return defer.reject(err); }

      //Send props object
      defer.resolve({ posts: posts });
    });
  } else {
    debug('return empty context');
    defer.resolve(null);
  }
  return defer.promise;
};
