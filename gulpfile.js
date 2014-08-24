'use strict';
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');

gulp.task('default', function() {
  gulp.src('styles/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('styles'));

  gulp.src(['./bower_components/pure/pure.css', './bower_components/pure/base.css',
  './bower_components/pure/grids-responsive.css', './bower_components/pure/grids.css'])
    .pipe(concat('pure-bundle.css'))
    .pipe(gulp.dest('./styles/'));
});
