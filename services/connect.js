var Q = require('q'),
    agenda = require('../utils/agenda'),
    mandrill = require('mandrill-api'),
    keystone = require('keystone'),
    debug = require('debug')('r3dm:mandrill'),

    resolver = require('../utils/viewResolver'),
    utils = require('../utils/utils');

var manClient = new mandrill.Mandrill(process.env.MANDRILL_KEY);
var greet = resolver('greet');

module.exports = {
  name: 'connect',
  create: function() {
    // Check if email exist in db
    // If it does, do nothing
    // else create a new lead and schedule
    // an email to be sent.
    var Lead = keystone.list('Lead');
    var args = [].slice.call(arguments),
        cb = args.pop(),
        params = args[2];

    params.name = createNameObject(params.name);
    var mongoosePromise = Lead.model.findOne({ email: params.email }).exec();

    var lead;
    return Q.when(mongoosePromise)
      .then(function(_lead) {
        debug('lead is ', _lead);
        if (!_lead) { // no lead found, create new lead
          lead = new Lead.model({
            email: params.email,
            name: params.name,
            utcOffset: params.utc
          });
          return Q.ninvoke(lead, 'save');
        }
        return; // lead already exist, do nothing.
      })
      .then(function(_lead) {
        if (_lead) { // a new lead was created, now schedule email
          debug('lead from save is ', lead);
          var jobName = 'send email to ' + lead.email;
          agenda.define(jobName, jobDefinition);
          agenda.schedule('tomorrow at 12 am', jobName, { email: lead.email });
          return cb(null, 'lead created, email scheduled');
        }
        return cb(null, 'lead exists, nothing done');
      });

    // Find lead in db, then send email via mandrill to lead.
    // Mark lead as initial contact sent.
    function jobDefinition(job, done) {
      var email = job.attrs.data.email,
          name = job.attrs.name,
          lead;
      debug('running %s for email %s', name, email);
      Q.when(Lead.model.findOne({ email: email }).exec())
        .then(function(_lead) {
          if (!_lead) {
            return Q.reject('could not find lead for ' + email + ' in db');
          }
          lead = _lead;
          return lead;
        })
        .then(function(lead) {
          debug('lead', lead);
          debug('Creating email message');
          var template = greet.render(lead);
          var message = createMessage(lead, template);

          var defer = Q.defer();
          // what kind of nonsense is this, Mandrill?
          manClient.messages.send(message, defer.resolve, defer.reject);
          return defer.promise;
        })
        .then(function(result) {
          debug('Email Success: ', result);
          if (result[0].status !== 'sent') {
            var msg = [
              'R3DM encountered an error trying to contact',
              lead.name.full,
              'return with status',
              result[0].status
            ].join(' ');
            return Q.reject(msg);
          }
          lead.initialEmailSent = true;
          return Q.ninvoke(lead, 'save');
        })
        .then(function() {
          done();
        })
        .catch(function(err) {
          debug('job error: ', err);
          done(err);
        });
    }
  }
};

function createNameObject(name) {
  name = name
    .split(' ')
    .map(function(_name) {
      _name = _name.replace(/[^A-Za-z_'-]/gi, '');
      _name = utils.capitalize(_name);
      return _name;
    });

  return {
    first: name[0],
    last: name.pop()
  };
}

function createMessage(lead, template) {
  return {
    message: {
      html: template,
      subject: 'Connect with The R3DM',
      to: [{
        email: lead.email,
        name: lead.full,
        type: 'to'
      }],
      'auto_text': true,
      'from_email': 'berkeley@r3dm.com',
      'from_name': 'Berkeley Martinez',
      'track_opens': true,
      'track_clicks': true
    }
  };
}
