var argv = require('yargs').argv,
  gulp = require('gulp'),
  gulpif = require('gulp-if'),
  inject = require('gulp-inject-string'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify');

function generate(locales, set, minify, filename) {
  var append = '', files = ['moment-holiday.js'];

  if (locales && locales.length) {
    if (locales.constructor !== Array) { locales = [locales]; }
    locales = locales.map(function(l){
      return 'locale/' + l.toLowerCase().replace(' ', '_') + '.js';
    });

    files = files.concat(locales);
  }

  if (!set && locales && locales.length === 1) { set = [locales[0]]; }

  if (set) {
    if (set.constructor !== Array) { set = [set]; }
    append = "\n//! Set default locales\n(function() {\n  var moment = (typeof require !== 'undefined' && require !== null) && !require.amd ? require('moment') : this.moment;";
    set.forEach(function(l){ append += '\n  moment.modifyHolidays.add("' + l + '");'; });
    append += '\n}).call(this);';
  }

  return gulp.src(files)
    .pipe(gulpif(minify, sourcemaps.init()))
    .pipe(concat(filename || 'moment-holiday-custom.js'))
    .pipe(gulpif(append !== '', inject.append(append)))
    .pipe(gulp.dest('build/'))
    .pipe(gulpif(minify, uglify({output: {comments: '/^!/'}})))
    .pipe(gulpif(minify, rename({ extname: '.min.js' })))
    .pipe(gulpif(minify, sourcemaps.write('.')))
    .pipe(gulp.dest('build/'));
}

gulp.task('default', function() {
  generate(argv.locale, argv.set, argv.min, argv.name);
});

gulp.task('build', function() {
  var locales = [];
  var localePath = require('path').join(__dirname, 'locale');
  require('fs').readdirSync(localePath).forEach(function(file){
    var locale = file.substring(0, file.lastIndexOf('.'));
    locales.push(locale);
  });

  generate(null, null, true, 'moment-holiday.js');
  generate(['United States', 'Easter'], 'United States', true, 'moment-holiday-us.js');
  generate(locales, 'United States', true, 'moment-holiday-pkg.js');
});
