'use strict';
var gulp = require('gulp'),

    // ## Style
    concat = require('gulp-concat'),
    sass = require('gulp-ruby-sass'),

    // ## Bundle
    browserify = require('browserify'),
    watchify = require('watchify'),
    envify = require('envify'),
    reactify = require('reactify'),
    bundleName = require('vinyl-source-stream'),

    // ## utils
    plumber = require('gulp-plumber'),

    // ## Serve/Proxy/Reload
    nodemon = require('gulp-nodemon'),
    sync = require('browser-sync'),
    reload = sync.reload;

var paths = {
  main: './client.js',
  stylus: './stylus/*.styl',
  sass: './sass/*.sass',
  css: './public/css/',
  pure: [
    './bower_components/pure/pure.css',
    './bower_components/pure/base.css',
    './bower_components/pure/grids-responsive.css'
  ],
  server: './server.js',
  watchJs: [
    './**/*.js',
    '!node_modules',
    '!components'
  ],
  publicJs: './public/js'
};

var watching = false;

gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.css));
});

gulp.task('buildpurecss', function() {
  gulp.src(paths.pure)
    .pipe(concat('pure-bundle.css'))
    .pipe(gulp.dest(paths.css));
});

gulp.task('bundle', function(cb) {
  browserifyCommon();
  cb();
});

gulp.task('sync', ['server'], function() {
  sync.init(null, {
    proxy: 'http://localhost:9000',
    files: ['public/**/*.*'],
    port: 9002,
    open: false
  });
});

gulp.task('server', function(cb) {
  var called = false;
  nodemon({
    script: paths.server,
    watch: paths.watchJs,
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'r3dm:*'
    }
  })
    .on('start', function() {
      if (!called) {
        called = true;
        cb();
      }
    });
});

gulp.task('watch', ['sync'], function(cb) {
  watching = true;
  browserifyCommon(cb);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.css + '**/*.css').on('change', function() {
    reload();
  });
});

gulp.task('default', ['watch', 'server', 'sync']);

function browserifyCommon(cb) {
  cb = cb || noop;
  var config;

  if (watching) {
    config = {
      basedir: __dirname,
      debug: true,
      cache: {},
      packageCache: {},
      fullPaths: true
    };
  } else {
    config = {
      basedir: __dirname
    };
  }

  var b = browserify(config);
  b.transform(reactify);

  if (watching) {
    console.log('Watching');
    b = watchify(b);
    b.on('update', function() {
      bundleItUp(b);
    });
  } else {
    b.transform(envify);
    //b.transform(uglifyify);
  }

  b.add(paths.main);
  bundleItUp(b);
  cb();
}

function bundleItUp(b) {
  console.log('Bundling');
  return b.bundle()
    .pipe(plumber())
    .pipe(bundleName('bundle.js'))
    .pipe(gulp.dest(paths.publicJs));
}

function noop() { }
