var React = require('react/addons'),
    PureRender = React.addons.PureRenderMixin;

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
                React.createElement("h3", null, "Society of Professional Hispanic Engineers"), 
                React.createElement("p", null, "San Francisco Bay Area")
              ), 
              React.createElement("p", null, 
                "Open your heart's eyes. Empty your mind;" + ' ' +
                "be formless, shapeless like water. Anxiety" + ' ' +
                "and panic will pass. Live life one inhalation" + ' ' +
                "and one exhalation at a time. Watch each breath" + ' ' +
                "appear and disappear, just breathing." + ' ' +
                "Bring love into your heart, into your" + ' ' +
                "breath and into your being."
              )
            ), 
            React.createElement("div", {className: "work_img"}, 
              "Image"
            )
          )
        )
      )
    );
  }
});

module.exports = Work;
