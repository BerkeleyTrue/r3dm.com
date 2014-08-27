'use strict';
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

gulp.task('sass', function() {
  gulp.src('styles/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('styles'));
});

gulp.task('buildpurecss', function() {
  gulp.src(['./bower_components/pure/pure.css', './bower_components/pure/base.css',
  './bower_components/pure/grids-responsive.css', './bower_components/pure/grids.css'])
    .pipe(concat('pure-bundle.css'))
    .pipe(gulp.dest('./styles/'));
});

gulp.task('server', function() {
  var connect = require('connect')
  var server = connect();
  server.use(connect.static(dest)).listen(process.env.PORT || 80, next);
});

gulp.task('default', function() {
  gulp.run('sass');
  gulp.run('buildpurecss');
});
