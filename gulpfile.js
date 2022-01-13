var gulp = require('gulp');
var zopfli = require('gulp-zopfli');
var brotli = require('gulp-brotli');

function brotli() {
  return gulp.src(['./dist/*.js', './dist/*.css']).pipe(brotli.compress()).pipe(gulp.dest('./dist'));
}

function zopfli() {
  return gulp.src(['./dist/*.js', './dist/*.css']).pipe(zopfli()).pipe(gulp.dest('./dist'));
}

var compress = gulp.series(brotli, zopfli);
gulp.task('compress', compress);

gulp.task('default', function () {
  gulp.run('compress');
});
