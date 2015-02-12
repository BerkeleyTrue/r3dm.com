var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */
var Post = new keystone.List('Post', {
  map: {
    name: 'title'
  },
  autokey: {
    path: 'slug',
    from: 'title',
    unique: true
  }
});

Post.add({
  cover: {
    type: Types.S3File
  },
  title: {
    type: String,
    required: true
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true,
    required: true
  },
  author: {
    type: Types.Relationship,
    ref: 'User',
    index: true
  },
  publishedDate: {
    type: Types.Date,
    index: true,
    dependsOn: {
      state: 'published'
    }
  },
  content: {
    brief: {
      type: Types.Html,
      wysiwyg: true,
      height: 150
    },
    extended: {
      type: Types.Html,
      wysiwyg: true,
      height: 400
    }
  }
});

Post.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Post.defaultSort = '-publishedDate';
Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';

Post.schema.pre('save', function(next) {
  var myPost = this,
      err;
  console.log('myPost', myPost);
  if (myPost.state === 'published') {
    if (!myPost.publishedDate) {
      err = new Error('Cannot publish a post without a publishedDate.');
      next(err);
    }
    if (!myPost.author) {
      err = new Error('Cannot publish a post without an author.');
      next(err);
    }
  }
  next();
});

Post.register();
