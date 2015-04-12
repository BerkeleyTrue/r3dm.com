//   from https://github.com/fdecampredon/rx-react
//
//   Copyright 2014 François de Campredon
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

var invariant = require('react/lib/invariant'),
    stateSubscriptions = [];

var StateStreamMixin = {

  statics: {
    cleanAllSubscriptions: cleanAllSubscriptions
  },

  getInitialState: function () {

    var displayName =
      this.constructor.displayName || this.constructor.name || '';

    invariant(
      typeof this.getStateStream === 'function',
      '%s use the StateStreamMixin it should provide a ' +
      '\'getStateStream\' function',
      displayName
    );

    this.__stateStream = this.getStateStream(this.props);
    invariant(
      isObservable(this.__stateStream),
      '\'%s.getStateStream\' should return an Rx.Observable, given : %s',
      displayName, this.__stateStream
    );

    var initialState = null;
    this.__stateStream.first().subscribe(function (val) {
      invariant(
        typeof val === 'object',
        'The observable returned by \'%s.getStateStream\' should publish ' +
        'Objects or null given : %s',
        displayName, val
      );
      initialState = val;
    });

    stateSubscriptions.push(this.__stateSubscription);

    return initialState;
  },

  componentDidMount: function() {

    var displayName =
      this.constructor.displayName || this.constructor.name || '';

    this.__stateSubscription = this.__stateStream.subscribe(function (val) {
      invariant(
        typeof val === 'object',
        'The observable returned by \'%s.getStateStream\' should publish ' +
        'Objects or null given : %s',
        displayName, val
      );
      /* eslint-disable react/no-did-mount-set-state */
      this.setState(val);
      /* eslint-enable react/no-did-mount-set-state */
    }.bind(this));

    stateSubscriptions.push(this.__stateSubscription);
  },

  componentWillUnmount: function () {
    if (this.__stateSubscription) {
      this.__stateSubscription.dispose();
      var index = stateSubscriptions.indexOf(this.__stateSubscription);
      if (index !== -1) {
        stateSubscriptions.splice(index, 1);
      }
    }
  }
};


module.exports = StateStreamMixin;

function cleanAllSubscriptions() {
  stateSubscriptions.forEach(function (subscription) {
    subscription.dispose();
  });
  stateSubscriptions = [];
}

function isObservable(obj) {
  return obj && typeof obj.subscribe === 'function';
}
