var debug = require('debug')('r3dm:globular');

module.exports = globular();

function globular() {

  if (typeof window !== 'undefined') {
    window = window || {};
  } else {
    window = {
      document: {},
      ga: function() {
        debug('Google Analytics called');
      }
    };
  }
  var ga = window.ga || function() { };
  var document = window.document || {};
  return {
    window: window,
    document: document,
    ga: ga
  };
}
