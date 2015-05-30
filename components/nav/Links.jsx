import React from 'react';
import Ink from 'react-ink';
import { Link } from 'react-router';
import classNames from 'classnames';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  static displayName = 'Links';
  static defaultProps = {
    handleClick: () => {}
  }
  static propTypes = {
    className: React.PropTypes.string,
    handleClick: React.PropTypes.func,
    hash: React.PropTypes.string,
    links: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        name: React.PropTypes.string,
        path: React.PropTypes.string
      })
    )
  }

  render() {
    const {
      className,
      handleClick,
      hash
    } = this.props;

    const val = this.props.links.map(function(link) {
      if (link.path.indexOf('#') !== -1) {
        const underLineClass = classNames({
          'nav_underline': true,
          'active': hash && link.path.indexOf(hash) !== -1
        });
        return (
          <li key={ link.path }>
            <a
              href={ link.path }
              onClick= { handleClick }
              target='_self'>
              <Ink />
              { link.name }
            </a>
            <div className={ underLineClass }></div>
          </li>
        );
      } else {
        return (
          <li key={ link.path }>
            <Link
              onClick={ handleClick }
              to={ link.path }>
              { link.name }
            </Link>
          </li>
        );
      }
    });

    return (
      <ul className={ className }>
        { val }
      </ul>
    );
  }
}
