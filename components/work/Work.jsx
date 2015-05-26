import React from 'react';

import Copy from './Copy.jsx';
import copy from './copy';

const TRIGGER = '(max-width: 30em)';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { smallScreen: false };
  }
  static displayName = 'Work'

  componentDidMount() {
    const matchMedia = typeof window !== 'undefined' ?
      window.matchMedia :
      null;

    this._mql = matchMedia(TRIGGER);
    this._mql.addListener(this.updateScreen);
    this.updateScreen(this._mql.matches, this.state.smallScreen);
  }

  componentWillUnmount() {
    this._mql.removeListener(this._updateScreen);
  }

  updateScreen(matches, smallScreen) {
    if (matches === smallScreen) {
      return;
    }
    this.setState({
      smallScreen: matches
    });
  }

  renderCopy(copy, smallScreen) {
    return copy.map((data, index) => (
      <Copy
        { ...data }
        key={ index }
        shouldSwitch={ index % 2 === 0 ? smallScreen : !smallScreen } />
    ));
  }

  render() {
    const { smallScreen } = this.state;
    return (
      <section
        className='work'
        id='work' >
        <header className='work_heading'>
          <h2>RECENT WORK</h2>
        </header>
        <div className='work_content' >
          { this.renderCopy(copy, smallScreen) }
        </div>
      </section>
    );
  }
}
