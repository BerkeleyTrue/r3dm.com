var React = require('react/addons'),
    ImgLoader = require('react-imageloader'),
    PureRender = React.addons.PureRenderMixin;

var Spinner = React.createClass({displayName: "Spinner",
  render: function() {
    return (
      React.createElement("svg", {
        className: "connect_sending-spinner", 
        width: "65px", 
        height: "65px", 
        viewBox: "0 0 66 66", 
        xmlns: "http://www.w3.org/2000/svg"}, 
        React.createElement("circle", {
          className: "connect_sending-path", 
          fill: "none", 
          strokeWidth: "6", 
          strokeLinecap: "round", 
          cx: "33", 
          cy: "33", 
          r: "30"}
        )
      )
    );
  }
});

var Work = React.createClass({displayName: "Work",
  mixins: [PureRender],

  render: function() {

    return (
      React.createElement("section", {className: "work"}, 
        React.createElement("header", {className: "work_heading"}, 
          React.createElement("h2", null, "Our Work")
        ), 
        React.createElement("div", {className: "work_content"}, 
          React.createElement("article", null, 
            React.createElement("div", {className: "work_copy"}, 
              React.createElement("header", null, 
                React.createElement("h3", null, "SHPE"), 
                React.createElement("p", null, "San Francisco Bay Area")
              ), 
              React.createElement("p", null, 
                "We teamed up with the Society Of Hispanic Professional" + ' ' +
                "Engineers - San Francisco Bay Area chapter to bring their" + ' ' +
                "public face to the wold up-to-date with Node.js and MongoDb" + ' ' +
                "and moving away from the tired world that is PHP." + ' ' +
                "In the process, we where able to save this non-profit money in" + ' ' +
                "the long-run by utilizing hosting plans availble for small" + ' ' +
                "companies using Node.js."
              )
            ), 
            React.createElement("div", {className: "work_img"}, 
              React.createElement(ImgLoader, {
                src: "images/mocks/ipad_iphone_portrait.png", 
                wrapper:  React.DOM.div, 
                preloader:  React.createFactory(Spinner) })
            )
          )
        )
      )
    );
  }
});

module.exports = Work;
