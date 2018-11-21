const gulp = require('gulp');
const changed = require('gulp-changed');
const handleErrors = require('../utils/handleErrors');
const options = require('../options');

gulp.task('copy', function () {
  console.log('haha')
  return gulp.src(options.copy)
    .pipe(changed(options.destination))
    .pipe(gulp.dest(options.destination))
    .on('error', handleErrors)
})