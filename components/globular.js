var debug = require('debug')('r3dm:globular');

module.exports = globular();

function globular() {

  var win;
  if (typeof window !== 'undefined') {
    win = window || {};
  } else {
    win = {
      document: {},
      ga: function() {
        debug('Google Analytics called');
      }
    };
  }
  var ga = win.ga || function() { };
  var document = win.document || {};
  return {
    window: win,
    document: document,
    ga: ga
  };
}
