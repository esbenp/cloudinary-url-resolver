var gulp = require('gulp');
var paths = require('../paths');

gulp.task('dev', function(callback) {
  return gulp.watch([paths.source], ['build']);
});
