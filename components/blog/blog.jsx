var React = require('react'),
    globular = require('../globular'),
    debug = require('debug')('r3dm:blog'),
    blogAction = require('./blog.action'),
    routerHistory = require('../common/history.action');

var Blog = React.createClass({
  getInitialState: function() {
    return {
      posts: [
        {title: 'first',
         body: 'laksdjflaskdfjalsdfkjasldfkjasldfj'},
       {title: 'second',
         body: 'laskdjflaskdjfalsdfkjlasdfkjlasdkf'}
      ]
    };
  },

  render: function() {
    var val = this.state.posts.map(function(e) {
      return (
        <div className='post'>
          <h3>{e.title}</h3>
          <p>{e.body}</p>
        </div>
      );
    });
    return <div>{val}</div>
  }
});

module.exports = Blog;
