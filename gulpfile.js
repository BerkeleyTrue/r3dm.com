process.env.DEBUG = process.env.DEBUG || 'r3dm:*';
var gulp = require('gulp'),

    // ## Style
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    swiss = require('kouto-swiss'),
    mincss = require('gulp-minify-css'),

    // ## Bundle
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    envify = require('envify/custom'),
    bundleName = require('vinyl-source-stream'),

    // ## utils
    _ = require('lodash'),
    plumber = require('gulp-plumber'),
    util = require('gulp-util'),
    notify = require('gulp-notify'),
    noopPipe = util.noop,
    yargs = require('yargs').argv,
    debug = require('debug')('r3dm:gulp'),

    // ## min
    imagemin = require('gulp-imagemin'),

    // ## Serve/Proxy/Reload
    nodemon = require('gulp-nodemon'),
    sync = require('browser-sync'),
    reload = sync.reload,

    // ## production?
    production = yargs.p;

var paths = {
  main: './client.js',
  jsx: './components/**/**.jsx',
  stylusMain: './components/app.styl',
  stylusAll: './components/**/*.styl',
  css: './public/css/',
  publicJs: './public/js',
  syncWatch: [
    'public/**/*.*',
    '!public/js/bundle.js'
  ],
  server: './server/server.js',
  serverIgnore: [
    'gulpfile.js',
    'public/',
    'components/**/*.styl',
    'bower_components/',
    'node_modules/'
  ]
};

var reloadDelay = 6000;

gulp.task('stylus', function() {
  return gulp.src(paths.stylusMain)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'stylus error',
        message: '<%= error %>'
      })
    }))
    .pipe(stylus({
      use: [
        swiss()
      ],
      'include css': true
    }))
    .pipe(concat('main.css'))
    .pipe(production ? mincss() : noopPipe())
    .pipe(gulp.dest(paths.css));
});

gulp.task('bundle', function(cb) {
  browserifyCommon(cb);
});

gulp.task('sync', ['bundle', 'stylus', 'server'], function() {
  sync.init(null, {
    ui: {
      port: 9001
    },
    proxy: 'http://localhost:9000',
    logLeval: 'debug',
    files: paths.syncWatch,
    port: 9002,
    open: false
  });
});

gulp.task('server', ['bundle'], function(cb) {
  var called = false;
  nodemon({
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'r3dm:*'
    },
    exec: './node_modules/.bin/babel-node',
    ext: '.js',
    ignore: paths.serverIgnore,
    script: paths.server
  })
    .on('start', function() {
      if (!called) {
        called = true;
        setTimeout(function() {
          cb();
        }, reloadDelay);
      }
    })
    .on('restart', function(files) {
      if (files) {
        debug('changed files: ', files);
      }
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.stylusAll, ['stylus']);
});

gulp.task('image', function() {
  gulp.src('images/**/*')
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 2
    }))
    .pipe(gulp.dest('public/images'));
});

gulp.task('default', [
  'bundle',
  'stylus',
  'server',
  'sync',
  'watch'
]);

function browserifyCommon(cb) {
  cb = cb || noop;
  var called = false;
  var _reload = _.debounce(reload, reloadDelay);

  var config = {
    basedir: __dirname,
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: false
  };

  var b = browserify(config);

  // transform es6/jsx into js
  b.transform(babelify.configure({
    sourceMapRelative: __dirname
  }));

  b.transform(envify({
    NODE_ENV: 'development'
  }));

  b = watchify(b);

  b.on('time', function(time) {
    if (!called) {
      called = true;
      cb();
    }
    notify('bundle completed in %s ms', time);
    _reload();
  });

  b.on('update', function(ids) {
    debug('update found', ids);
    bundleItUp(b);
  });

  b.add(paths.main);
  bundleItUp(b);
}

function bundleItUp(b) {
  debug('Bundling');
  return b.bundle()
    .on('error', function() {
      var args = [].slice.call(arguments);

      notify.onError({
        title: 'Compile Error',
        message: '<%= error %>'
      })
        .apply(this, args);

      this.emit('end');
    })
    .pipe(bundleName('bundle.js'))
    .pipe(gulp.dest(paths.publicJs));
}

function noop() { }
