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
    this._mql.addListener(::this.updateScreen);
    this.updateScreen(this._mql.matches);
  }

  componentWillUnmount() {
    this._mql.removeListener(this._updateScreen);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.smallScreen !== nextState.smallScreen;
  }

  updateScreen() {
    if (this._mql.matches === this.state.smallScreen) {
      return;
    }
    this.setState({
      smallScreen: this._mql.matches
    });
  }

  renderCopy(copy, smallScreen) {
    return copy.map((data, index) => {
      const shouldSwitch = smallScreen ? false : index % 2 === 0;
      return (
        <Copy
          { ...data }
          key={ index }
          shouldSwitch={ shouldSwitch } />
      );
    });
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
