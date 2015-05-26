import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static displayName = 'Switcher'
  static propTypes = {
    children: React.PropTypes.array,
    shouldSwitch: React.PropTypes.bool
  }

  render() {
    return (
      <div>
        { this.props.children[this.props.shouldSwitch ? 1 : 0] }
        { this.props.children[this.props.shouldSwitch ? 0 : 1] }
      </div>
    );
  }
}
