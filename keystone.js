'use strict';
module.exports = function(keystone) {
  keystone.init({
    'name': 'R3DM',
    'mongo': process.env.MONGOLAB_URI || process.env.MONGO_URI,
    'cookie secret': 'th3bigr3dmiscoming',
    'view engine': 'jade',
    'views': 'views',
    'port': process.env.PORT || 9000
  });

  keystone['import']('models');
  keystone.set('cloudinary config', process.env.CLOUDINARY_URL);
  keystone.set('mandrill api key', process.env.MANDRILL_KEY);
  keystone.set('mandrill username', process.env.MANDRILL_USERNAME);

  return keystone;
};
