/** @jsx React.DOM */
'use strict';
var React = require('react');

var Connect = React.createClass({
  onConnect: function() {

  },

  render: function() {

    return (
      <div className = 'connect'>
        <div className = 'connect_heading'>
          <h2>CONNECT</h2>
        </div>

        <div className = 'connect_email'>
          <div>
            <form className = 'pure-form'>
              <div>
                <input
                  type = 'email'
                  className = 'connect_input'
                  placeholder = 'email'/>
              </div>
              <div
                className = 'button'
                onClick = { this.onConnect() }>
                <span>
                  Connect
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});
module.exports = Connect;
