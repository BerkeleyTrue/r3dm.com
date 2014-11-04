/** @jsx React.DOM */
'use strict';
var React = require('react');

var Connect = React.createClass({
  render: function() {
    return (
      <div className = 'connect'>
        <div className = 'connect_heading'>
          <h2>CONN<span className = 'threes'>3</span>CT</h2>
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
              <div>
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
