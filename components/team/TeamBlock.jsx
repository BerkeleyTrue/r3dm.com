var React = require('react');

var Block = React.createClass({
  render: function() {
    var links = this.props.data.links.map(function(linkObj) {
      if (linkObj.type === 'github') {
        return (
          <a href={ linkObj.url }>
            <span className="fa-stack fa-lg">
              <i className="fa fa-circle fa-stack-2x"></i>
              <i className="fa fa-github-alt fa-stack-1x"></i>
            </span>
          </a>
        )
      } else if (linkObj.type === 'portfolio') {
        return (
          <a href={ linkObj.url }>
            <span className="fa-stack fa-lg">
              <i className="fa fa-circle fa-stack-2x"></i>
              <i className="fa fa-desktop fa-stack-1x"></i>
            </span>
          </a>
        )
      }
    });

    return (
      <div className = { this.props.className }>
        <img src= { this.props.data.imgUrl } />
        <div><h3>{ this.props.data.name }</h3></div>
        <div><p>{ this.props.data.copy }</p></div>
        { links }
      </div>
    );
  }
});
module.exports = Block;
