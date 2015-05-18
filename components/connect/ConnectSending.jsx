import React from 'react';
import Spinner from '../common/Spinner.jsx';

export default React.createClass({
  displayName: 'displayName',

  propTypes: {
    height: React.PropTypes.number
  },

  shouldComponentUpdate(nextProps) {
    return this.props.height !== nextProps.height;
  },

  render: function() {
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
});
