var Q = require('q'),
    Fetcher = require('fetchr'),
    debug = require('debug')('r3dm:fetchData');

module.exports = function(state) {
  var defer = Q.defer();
  if (state.path === '/blog') {
    debug('fetching blog data');
    var fetcher = new Fetcher({
      xhr: '/api'
    });
    fetcher.read('blogService', {}, {}, function(err, posts) {
      if (err) { return defer.reject(err); }

      //Send props object
      defer.resolve({ posts: posts });
    });
  } else {
    // Return no props
    defer.resolve(null);
  }
  return defer.promise;
};
