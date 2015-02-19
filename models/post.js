var keystone = require('keystone'),
    Types = keystone.Field.Types,
    debug = require('debug')('r3dm:models:post');

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
  },
  translation: {
    type: Types.Relationship,
    ref: 'Post'
  },
  language: {
    type: Types.Select,
    options: 'English, Español, Portugués'
  }
});

Post.schema.virtual('content.full').get(function() {
  return this.content.extended || this.content.brief;
});

Post.defaultSort = '-publishedDate';
Post.defaultColumns =
  'title, author|10%, state|10%, language|15%, publishedDate|20%';

Post.schema.pre('save', function(next) {
  var myPost = this,
      err;

  debug('saving Post:', myPost);
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

Post.schema.post('save', function(post) {
  debug('saved Post:', post);
  Post.model.findByIdAndUpdate(post.translation,
                               { $set: { translation: post.id }},
                               function(err, translation) {
    if (err) { throw err; }

    debug('translation updated:', translation);
  });
});

Post.register();
