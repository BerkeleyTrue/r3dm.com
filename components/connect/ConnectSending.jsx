import React from 'react';
import Spinner from '../common/Spinner.jsx';

export default class extends React.Component {
  constructor(props) { super(props); }
  static displayName = 'displayName'

  static propTypes = { height: React.PropTypes.number }

  shouldComponentUpdate(nextProps) {
    return this.props.height !== nextProps.height;
  }

  render() {
    return (
      <article
        className='connect connect_sending'
        key='sending'
        ref='sending'
        style={{ height: this.props.height }}>
        <Spinner
          circleClass='connect_sending-path'
          svgClass='connect_sending-spinner'/>
      </article>
    );
  }
}
