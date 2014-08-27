'use strict';
var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    nodemon     = require('gulp-nodemon'),
    sync        = require('browser-sync'),
    sass        = require('gulp-ruby-sass'),
    reload      = sync.reload
;

gulp.task('sass', function() {
  gulp.src('styles/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('./public/stylesheets'))
  ;
});

gulp.task('buildpurecss', function() {
  gulp.src([
    './bower_components/pure/pure.css',
    './bower_components/pure/base.css',
    './bower_components/pure/grids-responsive.css',
    './bower_components/pure/grids.css'
  ])
    .pipe(concat('pure-bundle.css'))
    .pipe(gulp.dest('./public/stylesheets/'))
  ;
});

gulp.task('sync', ['server'], function() {
  sync.init(null, {
    proxy: "http://localhost:5000",
    files: ["public/**/*.*"],
    browser: "google chrome",
    port: 7000
  });
});

gulp.task('server', function(cb) {
  var called = false;
  return nodemon({
    script: 'index.js'
  }).on('start', function () {
        if (!called) {
          called = true;
          cb();
        }
    })
  ;
});

gulp.task('default', ['sass', 'buildpurecss']);
gulp.task('watch', ['sync'], function () {
  //gulp.src('')
});
