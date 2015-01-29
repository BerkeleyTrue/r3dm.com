var Q = require('q'),
    mandrill = require('mandrill-api'),
    keystone = require('keystone'),
    debug = require('debug')('r3dm:mandrill'),

    resolver = require('../utils/viewResolver'),
    utils = require('../utils/utils');

var manClient = new mandrill.Mandrill(process.env.MANDRILL_KEY);
var greet = resolver('greet');

module.exports = {
  name: 'mandrillService',
  create: function() {
    debug('Creating email message');
    var Lead = keystone.list('Lead');
    var args = [].slice.call(arguments),
        cb = args.pop(),
        params = args[2],
        locals = {},
        template,
        message,
        person;

    person = params
      .name
      .split(' ')
      .map(function(_name) {
        _name = _name.replace(/[^A-Za-z_'-]/gi, '');
        _name = utils.capitalize(_name);
        return _name;
      });

    locals.firstname = person[0];
    locals.lastname = person.pop();
    locals.name = locals.firstname + ' ' + locals.lastname;
    locals.email = params.email;

    template = greet.render(locals);
    message = {
      html: template,
      subject: 'Connect with The R3DM',
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

    var lead = new Lead.model({
      email: locals.email,
      name: {
        first: locals.firstname,
        last: locals.lastname
      }
    });

    var leadSave = Q.defer();
    var emailDefer = Q.defer();

    lead.save(leadSave.makeNodeResolver());

    manClient.messages.send({ message: message }, function(result) {
      debug('Email Success: ', result);
      if (result[0].status === 'sent') {
        emailDefer.resolve();
      } else {
        emailDefer.reject(
          new Error('R3DM encountered an error trying to contact you.')
        );
      }
    }, function(err) {
      emailDefer.reject(err);
    });

    Q.all([
      leadSave.promise,
      emailDefer.promise
    ])
      .then(function() {
        cb(null, 'email successfull sent');
      })
      .catch(function(err) {
        debug('Err email service', err);
        cb(null, err);
      });
  }
};
