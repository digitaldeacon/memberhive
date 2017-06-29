var gulp = require('gulp');
var gzip = require('gulp-gzip');
var brotli = require('gulp-brotli');

gulp.task('compress', function() {
    gulp.src(['./dist/*.js', './dist/*.css'])
        .pipe(brotli.compress())
        .pipe(gulp.dest('./dist'));
    gulp.src(['./dist/*.js', './dist/*.css'])
        .pipe(gzip())
        .pipe(gulp.dest('./dist'));
});