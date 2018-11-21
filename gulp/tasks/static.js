const gulp = require('gulp');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const options = require('../options');

gulp.task('file', function () {
  let src = `${options.source}/*.*`;
  return gulp.src(src)
    .pipe(watch(src,
      {ignoreInitial: false,
        // read:false,
        events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir','error']}))
    .pipe(plumber())
    .pipe(gulp.dest(options.destination));
});