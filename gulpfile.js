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
    _ = require('lodash'),
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
  publicJs: './public/js',
  syncWatch: [
    'public/**/*.*',
    '!public/js/bundle.js'
  ],
  server: './server.js',
  serverIgnore: [
    'gulpfile.js',
    'public/',
    'components/**/*.styl',
    'components/**/*',
    'bower_components/',
    'node_modules/'
  ]
};

var watching = false;
var reloadDelay = 6000;

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
  return gulp.src(paths.jsx)
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
    files: paths.syncWatch,
    port: 9002,
    open: false
  });
});

gulp.task('server', ['bundle'], function(cb) {
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
        debug('changed files: ', files);
      }
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
  var called = false;
  var _reload = _.debounce(reload, reloadDelay);
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

  b.on('time', function(time) {
    if (!called) {
      called = true;
      cb();
    }
    debug('bundle completed in %s ms', time);
    _reload();
  });

  b.on('error', function(e) {
    debug('bundler error', e);
  });

  b.add(paths.main);
  bundleItUp(b);
}

function bundleItUp(b) {
  debug('Bundling');
  return b.bundle()
    .pipe(bundleName('bundle.js'))
    .pipe(gulp.dest(paths.publicJs));
}

function noop() { }
