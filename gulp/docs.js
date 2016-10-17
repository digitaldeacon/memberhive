'use strict';

var gulp = require('gulp');
var gulpDocs = require('gulp-ngdocs');
module.exports = function(options) {
  gulp.task('ngdocs', ['loopback'], function () {
    var options = {
      html5Mode: false,
      title: "Memberhive Client docs",
    };
    return gulp.src('client/app/scripts/lb-services.js')
      .pipe(gulpDocs.process(options))
      .pipe(gulp.dest('./dist/docs'));
  });
};
