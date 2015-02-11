var createActions = require('../util/createActions');

var AppActions = createActions([
  'setScroll',
  'setIsScrolling',
  'setWindowHeight'
]);

module.exports = AppActions;
