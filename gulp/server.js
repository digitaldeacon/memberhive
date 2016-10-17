'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var util = require('util');

var middleware = require('./proxy');

module.exports = function(options) {

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    if(middleware.length > 0) {
      server.middleware = middleware;
    }

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser,
      port: 9000,
      ghostMode: false
    });
  }

  function browserSyncSimpleInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components'
      };
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    if(middleware.length > 0) {
      server.middleware = middleware;
    }

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser,
      port: 9000,
      ghostMode: false,
      codeSync: false
    });
  }

  gulp.task('serve', ['watch', 'inject_config_default'], function () {
    browserSyncInit([options.tmp + '/serve', options.src]);
  });
  
   gulp.task('surf', ['watch', 'inject_config_default'], function () {
    browserSyncInit([options.tmp + '/serve', options.src]);
  });

  gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(options.dist);
  });
  
   gulp.task('serve:e2e', ['inject_config_default'], function () {
    browserSyncSimpleInit([options.tmp + '/serve', options.src], []);
  });

  gulp.task('serve:e2e-dist', ['build-default'], function () {
    browserSyncInit(options.dist, []);
  });

};
