var invariant = require('react/lib/invariant'),
    ViewportMetrics = require('react/lib/ViewportMetrics'),
    EventListener = require('react/lib/EventListener'),
    win;


// Scroll Mixin
// Flux Actions
// * setScroll
// * setIsScrolling
var ScrollListenerMixin = {

  getDefaultProps: function() {
    return {
      endScrollTimeout: 300
    };
  },

  getInitialState: function() {
    this.__scrollActions = typeof this.setScroll === 'function' &&
      typeof this.setIsScrolling === 'function';
    var state = {};
    if (!this.__scrollActions) {
      state = {
        scrollTop: 0,
        isScrolling: false
      };
    }
    return state;
  },

  componentDidMount: function () {

    win = typeof window !== 'undefined' ? window : false;

    invariant(
      win,
      'Scroll mixin requires window object to exist, but go %s',
      typeof win
    );

    this.__removeListener =
      EventListener.listen(win, 'scroll', this._onPageScroll);
  },

  componentWillUnmount: function () {
    this.__removeListener.remove();
  },

  _onPageScrollEnd: function () {
    var scrollTop = ViewportMetrics.currentScrollTop;
    if (scrollTop === this.state.scrollTop) {
      win.clearTimeout(this._pageScrollTimeout);
      if (this.__scrollActions) {
        this.setIsScrolling(false);
      } else {
        this.setState({ isScrolling: false });
      }
    }
  },

  _onPageScroll: function () {
    var scrollTop = ViewportMetrics.currentScrollTop;

    win.clearTimeout(this._pageScrollTimeout);
    this._pageScrollTimeout =
      win.setTimeout(this._onPageScrollEnd, this.props.endScrollTimeout);

    if (this.__scrollActions) {
      this.setScroll(scrollTop);
      this.setIsScrolling(true);
    } else {
      this.setState({
        scrollTop: scrollTop,
        isScrolling: true
      });
    }

  }
};

module.exports = ScrollListenerMixin;
