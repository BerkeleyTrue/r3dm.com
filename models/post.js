'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var postSchema = new Schema({
  author: String,
  title: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: true }
});

module.exports = mongoose.model('Post', postSchema);
