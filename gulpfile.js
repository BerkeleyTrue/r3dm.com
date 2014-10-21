'use strict';
process.env.DEBUG = process.env.DEBUG || 'r3dm:gulp';
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
    yargs = require('yargs').argv,
    debug = require('debug')('r3dm:gulp'),

    // ## min
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),

    // ## Serve/Proxy/Reload
    nodemon = require('gulp-nodemon'),
    sync = require('browser-sync'),
    reload = sync.reload,

    // ## production?
    production = yargs.p;


var paths = {
  main: './client.js',
  stylusMain: './stylus/main.styl',
  stylusAll: './stylus/**/*.styl',
  sass: './sass/*.sass',
  css: './public/css/',
  server: './server.js',
  serverIgnore: [
    'gulpfile.js',
    'public/',
    'stylus/',
    'bower_components/',
    'node_modules/'
  ],
  publicJs: './public/js'
};

var watching = false;

if (production) {
  // ## Set with `-p`
  console.log('\n', 'Production mode set', '\n');
}

gulp.task('stylus', function() {
  return gulp.src(paths.stylusMain)
    .pipe(plumber())
    .pipe(stylus({
      use: nib(),
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
    proxy: 'http://localhost:9000',
    files: [
      'public/**/*.*',
      '!public/js/bundle.js'
    ],
    port: 9002,
    open: false,
    reloadDelay: 2000
  });
});

gulp.task('server', function(cb) {
  var called = false;
  nodemon({
    script: paths.server,
    ext: '.js .jade',
    ignore: paths.serverIgnore,
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
    })
    .on('restart', function(files) {
      if (files) {
        debug('Files that changes: ', files);
      }
      setTimeout(function() {
        debug('Restarting browsers');
        reload();
      }, 3000);
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.stylusAll, ['stylus']);
});

gulp.task('setWatch', function() {
  watching = true;
});

gulp.task('image', function() {
  gulp.src('images/*')
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 2
      //use: [pngcrush()]
    }))
    .pipe(gulp.dest('public/images'));
});

gulp.task('default', [
  'setWatch',
  'bundle',
  'stylus',
  'server',
  'sync',
  'watch'
]);

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

  if (!production) {
    debug('Watching');
    b = watchify(b);
    b.on('update', function() {
      bundleItUp(b);
    });
  }

  if (production) {
    debug('Uglifying bundle');
    b.transform({
      global: true
    },
      uglifyify);

  }

  b.add(paths.main);
  bundleItUp(b);
  cb();
}

function bundleItUp(b) {
  debug('Bundling');
  return b.bundle()
    .pipe(plumber())
    .pipe(bundleName('bundle.js'))
    .pipe(gulp.dest(paths.publicJs));
}

function noop() { }
