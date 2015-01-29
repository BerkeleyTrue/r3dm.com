var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Lead Model
 * ==========
 */
var Lead = new keystone.List('Lead');

Lead.add({
  name: {
    type: Types.Name,
    required: true
  },
  email: {
    type: Types.Email,
    initial: false,
    required: true
  },
  followUp: {
    type: Types.Boolean,
    default: false
  },
  qualifed: {
    type: Types.Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Lead.schema.pre('save', function(next) {
  this.wasNew = this.isNew;
  next();
});

Lead.schema.post('save', function() {
  if (this.wasNew) {
    this.sendNotificationEmail();
  }
});

Lead.schema.methods.sendNotificationEmail = function(next) {
  var lead = this;

  keystone
    .list('User')
    .model
    .find()
    .where('isAdmin', true)
    .exec(function(err, admins) {
      if (err) { return next(err); }

      new keystone.Email('notify').send({
        to: admins,
        from: {
          name: 'r3dm',
          email: 'info@r3dm.com'
        },
        subject: 'New Lead For The R3DM',
        lead: lead
      }, next);
    });
};

Lead.defaultSort = '-createdAt';
Lead.defaultColumns = 'name, email, createdAt';
Lead.register();
