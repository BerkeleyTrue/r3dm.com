'use strict';
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('default', function() {
  gulp.src('styles/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('styles'));
});
