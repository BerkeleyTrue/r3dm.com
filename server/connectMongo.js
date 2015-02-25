var mongoose = require('mongoose');

module.exports = function() {
  var mongoUrl = process.env.MONGO_URI;
  mongoose.connect(mongoUrl);
  var db = mongoose.connection;
  db.on('error', function(err) {
    console.error('Mongoose connection failed', err);
  });
  db.on('open', function() {
    console.log('mongodb connection opened');
  });
  return mongoose;
};
