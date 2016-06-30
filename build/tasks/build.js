var gulp = require('gulp');
var runSequence = require('run-sequence');
var to5 = require('gulp-babel');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');

gulp.task('build', ['clean'], function(callback) {
  return gulp.src(paths.source)
    .pipe(to5(assign({}, compilerOptions, {modules:'umd'})))
    .pipe(gulp.dest(paths.output));
});
