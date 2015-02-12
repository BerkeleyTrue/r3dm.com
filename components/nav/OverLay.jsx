var React = require('react/addons'),
    cx = React.addons.classSet,
    PureRenderMixin = React.addons.PureRenderMixin;

var OverLay = React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    var OverLayClass = cx({
      'SideNav_overlay': true,
      'SideNav_overlay-show': this.props.show
    });

    return (
      <div className={ OverLayClass } {...this.props }/>
    );
  }
});

module.exports = OverLay;
