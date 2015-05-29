import React from 'react';
import { data } from './team_data';
import Block from './TeamBlock.jsx';

const blockClass = [
  'team_block',
  'team_block-padding'
].join(' ');

export default class extends React.Component {
  constructor() {
    super();
  }

  static displayName = 'Team'

  shouldComponentUpdate() {
    return false;
  }

  renderBlocks() {
    if (!data.length) {
      return null;
    }
    return data.map(function(datum) {
      return (
        <Block
          className={ blockClass }
          data={ datum }
          key={ datum.name } />
      );
    });
  }

  render() {
    return (
      <div
        className='team'
        id='team'>
        <div className='team_heading'>
          <h2>THE TEAM</h2>
        </div>
        <div className='blocks-container'>
          { this.renderBlocks() }
        </div>
      </div>
    );
  }
}
