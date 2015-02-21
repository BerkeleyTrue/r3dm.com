var React = require('react/addons'),
    PureRenderMixin = React.addons.PureRenderMixin,

    Copy = require('./ServicesCopy');

var Services = React.createClass({displayName: "Services",
  mixins: [PureRenderMixin],

  _renderCopy: function(copy) {
    return copy.map(function(_copy) {
      return (
        React.createElement(Copy, {
          key:  _copy.title, 
          title:  _copy.title, 
          content:  _copy.content})
      );
    });
  },

  render: function() {
    var copyData = [{
      title: 'Node.js',
      content: ("We build fast and scalable applications using Node.js.\n        Why Node.js? Node.js allows you to serve simultaneous requests\n        increasing the performance without the need to use caching\n        services. This means you can serve more of your users with less\n        infrastructure"



)
    }, {
      title: 'React.js',
      content: ("Using isomorphic Javascript with React.js means users without\n        Javascript can still load a basic version of your site, while those\n        with will be delivered a beautifully fast and rich experience\n      "


)
    }, {
      title: 'API Development',
      content: ("We deliver fast and secure API servers that can be used to feed\n        your mobile users all the data they crave. We build our api's to be\n        easily updated and extended\n      "


)
    }, {
      title: 'MVP Creation',
      content: ("From idea to MVP, we take your early stage startup and deliver\n        an impressive minimal viable product that can easily scale to fit your\n        user base\n      "


)
    }, {
      title: 'Mobile Developement',
      content: ("We build our apps to respond to any environment, whether that\n        is Android or iOS, Windows or OSX. We build our mobile experience to\n        contain realistic motion to give your users an intutive experience they\n        can feel as well as see.\n      "



)
    }];

    return (
      React.createElement("section", {
        id: "services", 
        className: "services"}, 
        React.createElement("header", {className: "services_subject-center services_heading"}, 
          React.createElement("h2", null, "SERVICES")
        ), 
        React.createElement("div", {className: "services_content"}, 
             this._renderCopy(copyData) 
        )
      )
    );
  }
});

module.exports = Services;
