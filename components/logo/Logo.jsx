var React = require('react'),

    Isvg = require('react-inlinesvg'),
    LogoSvg = require('./LogoSvg.jsx'),
    LogoMark = require('./LogoMark.jsx'),
    LogoType = require('./LogoType.jsx');

var Logo = React.createClass({
  displayName: 'Logo',

  propTypes: {
    type: React.PropTypes.string,
    logoClass: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      type: '',
      logoClass: ''
    };
  },

  shouldComponentUpdate(nextProps) {
    return this.props.type !== nextProps.type ||
      this.props.logoClass !== nextProps.logoClass;
  },

  render: function() {
    var type = this.props.type;
    var imageSrc = 'images/logos/logo';
    var LogoComp;

    // logo/mark/type
    if (type === 'mark') {
      imageSrc = imageSrc + '-mark';
      LogoComp = LogoMark;
    } else if (type === 'type') {
      imageSrc = imageSrc + '-type';
      LogoComp = LogoType;
    } else {
      LogoComp = LogoSvg;
    }

    return (
      <Isvg
        className={ this.props.logoClass }
        preloader={ React.createFactory(LogoComp) }
        src= { imageSrc + '.svg'}
        wrapper={ React.DOM.div }>
        <img src={ imageSrc + '.png' }/>
      </Isvg>
    );
  }
});
module.exports = Logo;
