var React = require('react');

var Block = React.createClass({
  displayName: 'Block',
  propTypes: {
    data: React.PropTypes.object,
    className: React.PropTypes.string
  },

  render: function() {
    var links = this.props.data.links.map(function(linkObj) {
      // mapping of link-types to font-awesome icon names
      var map = {
        github: 'github-alt',
        portfolio: 'desktop',
        linkedin: 'linkedin',
        email: 'envelope'
      };

      var result = [];

      result.push((
        <a href={ linkObj.url }>
          <span className='fa-stack fa-lg'>
            <i className='fa fa-circle fa-stack-2x'></i>
            <i className={ 'fa fa-stack-1x fa-' + map[linkObj.type] } ></i>
          </span>
        </a>
      ));
      return result;
    });

    return (
      <div className = { this.props.className }>
        <img src= { this.props.data.imgUrl } />
        <div><h3>{ this.props.data.name }</h3></div>
        <div><p>{ this.props.data.copy }</p></div>
        <div className='links-container'>
          { links }
        </div>
      </div>
    );
  }
});
module.exports = Block;
