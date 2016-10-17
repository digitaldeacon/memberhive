'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var sh = require('shelljs');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
  gulp.task('partials', function () {
    return gulp.src([
      options.src + '/app/**/*.html',
      options.tmp + '/serve/app/**/*.html'
    ])
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'mh.core',
        root: 'app/'
      }))
      .pipe(gulp.dest(options.tmp + '/partials/'));
  });

  gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(options.tmp + '/partials/templateCacheHtml.js', { read: false });
    var partialsInjectOptions = {
      starttag: '<!-- inject:partials -->',
      ignorePath: options.tmp + '/partials',
      addRootSlash: false
    };

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(options.tmp + '/serve/index.html')
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))
      .pipe(assets = $.useref.assets())
      .pipe($.rev())
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
      .pipe($.uglify()).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore())
      .pipe(gulp.dest(options.dist + '/'))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
  });

  // Only applies for fonts from bower dependencies
  // Custom fonts are handled by the "other" task
  gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(options.dist + '/fonts/'));
  });

  gulp.task('images', function () {
    return gulp.src([
      options.src + '/app/images/**/*',
      '!' + options.src + '/app/images/**/*.{html,css,js,scss}',
    ])
    .pipe(gulp.dest(options.dist + '/app/images'));
  });
   

   gulp.task('other', function () {
    return gulp.src([
      options.src + '/*.{ico,png,txt,css,json}',
    ])
    .pipe(gulp.dest(options.dist + '/'));
  });
   
  gulp.task('other-css', ['styles-standalone'], function () {
    return gulp.src([
      options.tmp + '/serve/standalone/*',
    ])
    .pipe(gulp.dest(options.dist + '/standalone'));
  });

  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', ['html', 'fonts', 'images', 'other', 'other-css', 'ngdocs'], function(){
    var commitMsg = sh.exec('git log -1 --pretty=%B', {silent: true}).output.trim().replace(/(\r\n|\n|\r)/gm," ");
    var commitSHA = sh.exec('git log --pretty=format:"%h" -n 1', {silent: true}).output.trim();
    var config = {
      apiUrl: "/api",
      commitMsg: commitMsg,
      commitSHA: commitSHA,
      production: true
    };
    return gulp.src(options.dist + '/index.html')
      .pipe(replace('{apiUrl : "http://127.0.0.1:3994/api", commitMsg: "dev", commitSHA: "master", production: false}', JSON.stringify(config)))
      .pipe(gulp.dest(options.dist + '/'))
      .once('end', function () { //back because of https://github.com/strongloop/gulp-loopback-sdk-angular/issues/3
        process.exit();
      });
  });

  gulp.task('build-default', ['html', 'fonts', 'images', 'other', 'other-css'], function () {
     return gulp.src(options.dist + '/index.html')
      .pipe(gulp.dest(options.dist + '/'))
      .once('end', function () { //back because of https://github.com/strongloop/gulp-loopback-sdk-angular/issues/3
        process.exit();
      });
  });
};
