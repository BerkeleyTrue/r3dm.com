var Post = require('../models/post.js');

exports.makeNewPost = function(req, res) {
  new Post({title: 'test', author: 'berks'}).save();
};

exports.getPosts = function(req, res) {
  Post.find(function
