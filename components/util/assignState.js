var _ = require('lodash');

module.exports = assignState;

function assignState(newState) {
  return {
    transform: function(oldState) {
      return _.assign({}, oldState, newState);
    }
  };
}
