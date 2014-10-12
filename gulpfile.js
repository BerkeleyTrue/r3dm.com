'use strict';
var gulp = require('gulp'),

    // ## Style
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    nib = require('nib'),
    mincss = require('gulp-minify-css'),

    // ## Bundle
    browserify = require('browserify'),
    watchify = require('watchify'),
    envify = require('envify'),
    reactify = require('reactify'),
    uglifyify = require('uglifyify'),
    bundleName = require('vinyl-source-stream'),

    // ## utils
    plumber = require('gulp-plumber'),
    util = require('gulp-util'),
    noopPipe = util.noop,
    //logPipe = util.log,
    yargs = require('yargs'),

    // ## Serve/Proxy/Reload
    nodemon = require('gulp-nodemon'),
    sync = require('browser-sync'),

    // ## production?
    production = yargs.p;

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
    '!./node_modules',
    '!./public/',
    '!./bower_components/',
    '!./stylus/'
  ],
  publicJs: './public/js'
};

var watching = false;

gulp.task('stylus', function() {
  return gulp.src(paths.stylus)
    .pipe(plumber())
    .pipe(stylus({
      use: nib(),
      'include Css': true
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
    watch: '.js .jade',
    ignore: [
      './public',
      './stylus',
      './bower_components',
      './node_modules'
    ],
    env: {
      'NODE_ENV': 'development',
      'DEBUG': 'r3dm:*'
    }
  })
    .on('start', function() {
      if (!called) {
        called = true;
        setTimeout(function() {
          cb();
        }, 2000);
      }
    });
});

gulp.task('watch', function() {
  watching = true;
  gulp.watch(paths.stylus, ['stylus']);
});

gulp.task('default', ['bundle', 'stylus', 'server', 'sync', 'watch']);

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
  b.transform(envify);

  if (watching) {
    console.log('Watching');
    b = watchify(b);
    b.on('update', function() {
      bundleItUp(b);
    });
  }

  if (production) {
    b.transform(uglifyify);
  } else {
    b.require('react');
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
