'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
module.exports = function(options) {
  gulp.task('lint', function() {
    return gulp.src([options.src + '/app/**/*.js', "!"+options.src + '/app/scripts/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter("default"))
      .pipe(jshint.reporter('fail'));
  });
  gulp.task('test', ['lint']);
};
