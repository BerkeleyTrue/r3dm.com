var React = require('react'),
    Link = require('react-router').Link;

var Links = React.createClass({

  propTypes: {
    links: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        path: React.PropTypes.string
      })
    )
  },

  render: function() {

    var val = this.props.links.map(function(link) {
      if (link.path.indexOf('#') !== -1) {
        return (
          <li key={ link.path }>
            <a href={ link.path } target='_self'>
                { link.name }
            </a>
          </li>
        );
      } else {
        return (
          <li key={ link.path }>
            <Link to={ link.path }>{ link.name }</Link>
          </li>
        );
      }
    });

    return (
      <ul className={ this.props.className }>
        { val }
      </ul>
    );
  }
});
module.exports = Links;
