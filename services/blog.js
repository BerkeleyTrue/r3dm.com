'use strict';
var blog = require('mandrill-api'),
    resolver = require('../utils/viewResolver'),
    debug = require('debug')('r3dm:blog'),
    utils = require('../utils/utils');

var greet = resolver('greet');
module.exports = {
  name: 'blogService',
  create: function() {
    //TODO
  }
};
