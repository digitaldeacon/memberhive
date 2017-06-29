var gulp = require('gulp');
var zopfli = require('gulp-zopfli');
var brotli = require('gulp-brotli');

gulp.task('compress', function() {
    gulp.src(['./dist/*.js', './dist/*.css'])
        .pipe(brotli.compress())
        .pipe(gulp.dest('./dist'));
    gulp.src(['./dist/*.js', './dist/*.css'])
        .pipe(zopfli())
        .pipe(gulp.dest('./dist'));
});