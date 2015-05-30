import keystone from 'keystone';
import debugFactory from 'debug';

const debug = debugFactory('r3dm:models:post');
const Types = keystone.Field.Types;

const Post = new keystone.List('Post', {
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
      type: Types.Markdown
    },
    extended: {
      type: Types.Markdown,
      height: 500
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
  return this.content.extended.html || this.content.brief.html;
});

Post.defaultSort = '-publishedDate';
Post.defaultColumns =
  'title, author|10%, state|10%, language|15%, publishedDate|20%';

Post.schema.pre('save', function(next) {
  let err;

  debug('saving Post:', this.id);
  if (this.state === 'published') {
    if (!this.publishedDate) {
      err = new Error('Cannot publish a post without a publishedDate.');
      next(err);
    }
    if (!this.author) {
      err = new Error('Cannot publish a post without an author.');
      next(err);
    }
  }
  next();
});

Post.register();
