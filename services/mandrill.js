'use strict';
var mandrill = require('mandrill-api'),
    resolver = require('../utils/viewResolver'),
    debug = require('debug')('r3dm:mandrill'),
    manClient = new mandrill.Mandrill(process.env.MANDRILL_KEY);

var greet = resolver('greet');
module.exports = {
  name: 'mandrillService',
  create: function() {
    debug('Creating email message');
    var args = [].slice.call(arguments),
        cb = args.pop(),
        params = args[2],
        locals = {},
        template,
        message;

    locals.name = params.name;
    locals.email = params.email;

    template = greet.render(locals);
    message = {
      html: template,
      to: [{
        email: locals.email,
        name: locals.name,
        type: 'to'
      }],
      'auto_text': true,
      'from_email': 'berkeley@r3dm.com',
      'from_name': 'Berkeley Martinez',
      'track_opens': true,
      'track_clicks': true
    };

    manClient.messages.send({ message: message }, function(result) {
      debug('Email Success: ', result);
      if (result[0].status === 'sent') {
        cb(null, 'email successfull sent');
      } else {
        cb(new Error('R3DM encountered an error trying to contact you.'));
      }
    }, function(err) {
      debug('Mandrill Err', err);
      cb(new Error('R3DM encountered an error trying to contact you.'));
    });
  }
};
