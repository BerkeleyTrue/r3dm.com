var keystone = require('keystone'),
    User = keystone.list('User');

module.exports = function(done) {

  new User.model({
    name: {
      first: 'Robot',
      last: 'R3DM'
    },
    email: 'info@r3dm.com',
    password: 'admin',
    isAdmin: true
  })
  .save(done);
};
