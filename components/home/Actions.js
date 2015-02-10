var createActions = require('../util/createActions');

var HomeActions = createActions([
  'setScroll',
  'setIsScrolling',
  'setWindowHeight'
]);

module.exports = HomeActions;
