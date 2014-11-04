'use strict';
module.exports = function(keystone) {
  keystone.init({
    'name': 'R3DM',
    'mongo': process.env.MONGO_URI,
    'cookie secret': 'th3bigr3dmiscoming',
    'view engine': 'jade',
    'views': 'views',
    'port': process.env.PORT || 9000
  });

  keystone['import']('models');

  return keystone;
};
