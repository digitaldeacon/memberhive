'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var loopbackAngular = require('gulp-loopback-sdk-angular');
var path = require('path');
var fs = require("fs");
var through = require('through2');
module.exports = function(options) {
  function prefixStream(prefixText) {
    var options = {
      modelConfig: './server/model-config.json',
      modelDir: './common/models/'
    };
    var models = require(path.resolve(options.modelConfig));
    for (var modelName in models) {
      if (models[modelName].public) {
        // Convert model name to filename
        var fileName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
        fileName = fileName.replace(/([A-Z])/g, function($1) {
          return "-"+$1.toLowerCase();
        });
        try {
          var model = require(path.resolve(options.modelDir + fileName + '.json'));
          for (var prop in model.properties) {
            model.properties[prop].key = prop;
          }
          var regex = new RegExp(`(module\\.factory\\([\\s]*\"${modelName}\"[\\s\\S]*?)(return R;)`);
          var replace = '$1' + 'R.model=' + JSON.stringify(model) + ';\n\n' + '$2';
          prefixText = prefixText.replace(regex, replace);
        } catch (e) {
        }
      }
    }
    return prefixText;
  }
  
  function addModel()
  {
    var stream = through.obj(function(file, enc, cb) {
      if (file.isBuffer()) {
        file.contents = new Buffer(prefixStream(file.contents.toString()));
      }
      this.push(file);
      cb();
    });

    // returning the file stream
    return stream;
  }
  
  gulp.task('loopback', function () {
      return gulp.src('./server/server.js')
      .pipe(loopbackAngular({apiUrl:'http://127.0.0.1:3994/api'}))
      .pipe(rename('lb-services.js'))
      .pipe(addModel())
      .pipe(gulp.dest(options.src+'/app/scripts/'));
  });
}
