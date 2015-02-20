var Agenda = require('agenda'),
    debug = require('debug')('r3dm/utils/agenda');

// process only every 10 minutes, as this is only
// used to send emails at the moment.
// This may need to change if it is used for other reasons.
var agenda = new Agenda({
  db: {
    address: process.env.MONGO_URI,
    collection: 'jobs'
  },
  processEvery: '30 seconds'
});

agenda.on('success', function(job) {
  debug('Job %s success', job.attrs.name);
});

agenda.on('complete', function(job) {
  debug('Job %s complete', job.attrs.name);
});

agenda.on('fail', function(job) {
  debug('Job %s fail', job.attrs.name);
});

// Start processing job queue
agenda.start();

module.exports = agenda;
