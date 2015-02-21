process.env.DEBUG = process.env.DEBUG || 'r3dm:*';
var gulp = require('gulp'),

    // ## Style
    concat = require('gulp-concat'),
    stylus = require('gulp-stylus'),
    swiss = require('kouto-swiss'),
    mincss = require('gulp-minify-css'),

    // ## Bundle
    browserify = require('browserify'),
    watchify = require('watchify'),
    envify = require('envify/custom'),
    uglifyify = require('uglifyify'),
    bundleName = require('vinyl-source-stream'),

    // ## utils
    plumber = require('gulp-plumber'),
    util = require('gulp-util'),
    noopPipe = util.noop,
    watch = require('gulp-watch'),
    yargs = require('yargs').argv,
    debug = require('debug')('r3dm:gulp'),

    // ## min
    imagemin = require('gulp-imagemin'),

    // ## Serve/Proxy/Reload
    nodemon = require('gulp-nodemon'),
    sync = require('browser-sync'),
    reload = sync.reload,

    // ## React
    react = require('gulp-react'),

    // ## production?
    production = yargs.p;

var paths = {
  main: './client.js',
  jsx: './components/**/**.jsx',
  stylusMain: './components/app.styl',
  stylusAll: './components/**/*.styl',
  css: './public/css/',
  server: './server.js',
  serverIgnore: [
    'gulpfile.js',
    'public/',
    'components/**/*.styl',
    'bower_components/',
    'node_modules/'
  ],
  publicJs: './public/js'
};

var watching = false;
var reloadDelay = 6500;
var reloadTimer;

if (production) {
  // ## Set with `-p`
  console.log('\n', 'Production mode set', '\n');
}

gulp.task('stylus', function() {
  return gulp.src(paths.stylusMain)
    .pipe(plumber())
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

gulp.task('jsx', function() {
  return gulp.src('./components/**/*.jsx')
    .pipe(plumber())
    .pipe(react({
      harmony: true
    }))
    .pipe(gulp.dest('./components'));
});

gulp.task('jsx-watch', function() {
  return gulp.src(paths.jsx)
    .pipe(watch(paths.jsx))
    .pipe(plumber())
    .pipe(react({
      harmony: true
    }))
    .pipe(gulp.dest('./components'));
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
    files: [
      'public/**/*.*',
      '!public/js/bundle.js'
    ],
    port: 9002,
    open: true,
    reloadDelay: reloadDelay
  });
});

gulp.task('server', function(cb) {
  var called = false;
  nodemon({
    script: paths.server,
    ext: '.js',
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
        }, reloadDelay);
      }
    })
    .on('restart', function(files) {
      if (files) {
        debug('files changed: ', files);
      }
      if (reloadTimer) {
        clearTimeout(reloadTimer);
      }
      debug('setting reload on %s timeout', reloadDelay);
      reloadTimer = setTimeout(function() {
        reload();
      }, reloadDelay);
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.stylusAll, ['stylus']);
});

gulp.task('setWatch', function() {
  watching = true;
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
  'setWatch',
  'jsx-watch',
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
      packageCache: {}
    };
  } else {
    config = {
      basedir: __dirname
    };
  }

  var b = browserify(config);
  b.transform(envify({
    NODE_ENV: 'development'
  }));

  if (!production) {
    debug('Watching');
    b = watchify(b);
    b.on('update', function() {
      bundleItUp(b);
    });
  }

  if (production) {
    debug('Uglifying bundle');
    b.transform({ global: true }, uglifyify);
  }

  b.on('error', function(e) {
    debug('bundler error', e);
  });

  b.add(paths.main);
  bundleItUp(b);
  cb();
}

function bundleItUp(b) {
  debug('Bundling');
  return b.bundle()
    .pipe(bundleName('bundle.js'))
    .pipe(gulp.dest(paths.publicJs));
}

function noop() { }
