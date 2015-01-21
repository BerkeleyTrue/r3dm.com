var React = require('react'),
    Isvg = require('react-inlinesvg');

var Block = React.createClass({
  render: function() {
    var icon = {
      png: 'images/icon-' + this.props.title.toLowerCase() + '.png',
      svg: 'images/icon-' + this.props.title.toLowerCase() + '.svg'
    };
    return (
      <div className = { this.props.className }>
        <div>
          <Isvg
            className = "services_block-icon"
            wrapper = { React.DOM.div }
            src = { icon.svg }>
            <img src= { icon.png } />
          </Isvg>
        </div>
        <div><h3>{ this.props.title.toUpperCase() }</h3></div>
        <div><p>{ this.props.copy }</p></div>
      </div>
    );
  }
});

module.exports = Block;
