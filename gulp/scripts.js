'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var gulpWebpack = require('webpack-stream');

module.exports = function(options) {
  function webpack(watch, callback) {
    var webpackOptions = {
      watch: watch,
      module: {
        preLoaders:
        [
          {
            test: /\.js$/,
            exclude: [/node_modules/, /lb-services.js/, /FileSaver.min.js/],
            loader: 'jshint-loader'
          }

        ],
        loaders:
        [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                cacheDirectory: true,
                presets: ['es2015']
            }
          }
        ]
      },
      output: { filename: 'index.js' }
    };

    if(watch) {
      webpackOptions.devtool = 'inline-source-map';
    }

    var webpackChangeHandler = function(err, stats) {
      if(err) {
        options.errorHandler('Webpack')(err);
      }
      $.util.log(stats.toString({
        colors: $.util.colors.supportsColor,
        chunks: false,
        hash: false,
        version: false
      }));
      browserSync.reload();
      if(watch) {
        watch = false;
        callback();
      }
    };

    return gulp.src(options.src + '/app/app.js')
      .pipe(gulpWebpack(webpackOptions, null, webpackChangeHandler).on('error', (err) => {
        console.error('WEBPACK ERROR', err);
      }))
      .on('error', (err) => {
        console.error('WEBPACK ERROR', err);
      })
      .pipe($.ngAnnotate())
      .pipe(gulp.dest(options.tmp + '/serve/app'));
  }

  gulp.task('scripts', ['loopback'], function () {
    return webpack(false);
  });

  gulp.task('scripts:watch', ['scripts'], function (callback) {
    return webpack(true, callback);
  });
};
