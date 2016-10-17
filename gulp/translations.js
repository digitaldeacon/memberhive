var gulp = require('gulp');
var gettext = require('gulp-angular-gettext');

module.exports = function(options) {
  gulp.task('generatePot', function() {
    return gulp.src([options.src + '/app/**/*.html', options.src + 'app/**/*.js'])
      .pipe(gettext.extract('template.pot', {
        // options to pass to angular-gettext-tools...
      }))
      .pipe(gulp.dest(options.po));
  });

  gulp.task('compileTranslations', function() {
    return gulp.src(options.po + '/**/*.po')
      .pipe(gettext.compile({
        // options to pass to angular-gettext-tools...
      }))
      .pipe(gulp.dest(options.src + '/app/translations/'));
  });

  gulp.task('updateWords', [
    'generatePot',
    'uploadWords'
  ]);

  gulp.task('updateTranslations', [
    'downloadTranslations',
    'compileTranslations'
  ]);
  

  
};
