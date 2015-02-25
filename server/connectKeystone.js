var keystone = require('keystone');

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
    'mandrill api key': process.env.MANDRILL_KEY,
    'mandrill username': process.env.MANDRILL_USERNAME
  });

  keystone.import('../models');
  keystone.static(app);
  keystone.routes(app);
  keystone.mongoose = mongoose;
};
