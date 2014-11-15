'use strict';
var mandrill = require('mandrill-api'),
    debug = require('debug')('r3dm:mandrill'),
    manClient = new mandrill.Mandrill(process.env.MANDRILL_KEY);

module.exports = {
  name: 'mandrillService',
  create: function() {
    debug('Creating email message');
    var args = [].slice.call(arguments),
        cb = args.pop(),
        params = args[2],
        name = params.name,
        email = params.email;

    var message = {
      html: '<h1>Hello World</h1>',
      to: [{
        email: email,
        name: name,
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
