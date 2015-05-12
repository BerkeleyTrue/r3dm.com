var keystone = require('keystone');
var adminAppRouter = require('keystone/admin/app/static');
var debugFactory = require('debug');

var debug = debugFactory('r3dm:keystone');

module.exports = function connectKeystone(app, mongoose) {
  keystone.app = app;
  keystone.mongoose = mongoose;
  keystone.init({
    'cookie secret': '12345',
    'auth': true,
    'user model': 'User',
    'mongo': process.env.MONGO_URI,
    'session': true,

    'brand': 'The R3DM',
    'emails': 'views/email',
    'updates': '../updates',
    'mandrill api key': process.env.MANDRILL_KEY,
    'mandrill username': process.env.MANDRILL_USERNAME
  });

  keystone.import('../../models');
  app.use('/keystone', adminAppRouter);
  keystone.routes(app);
  keystone.mongoose = mongoose;
  mongoose.connection.on('open', function() {
    debug('auto updating');
    keystone.applyUpdates(function(err) {
      debug('auto update complete with ' + (err && err.message || 'no error'));
    });
  });
};
