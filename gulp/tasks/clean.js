const del = require('del');
const gulp = require('gulp');
const destionation = require('../options').destination;

gulp.task('clean', function () {
  return del(`${destionation}/**`);
})