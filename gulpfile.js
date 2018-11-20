const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const bs = require('browser-sync');
const changed = require('gulp-changed');
const del = require('del');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const include = require('gulp-include');
const pug = require('gulp-pug');
const minimist = require('minimist');
const nano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sequence = require('run-sequence');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');


const path = {
  build: 'build',
  src: 'src'
};

const options = minimist(process.argv.slice(2), {
  string: ['env'],
  default: {
    env: 'dev',
  },
});

let oneChatPath = path.build;
// const renamed = 'notification.wxss';

const gulpSrc = gulp.src;

gulp.src = function onError(...args) {
  return gulpSrc
    .apply(gulp, args)
    .pipe(plumber(function onError(error) {
      gutil.log(gutil.colors.red(`Error (${error.plugin}): ${error.message}`));
    }));
}


gulp.task('default', (callback) => sequence(
  ['build'],
  ['server'],
  callback
));


gulp.task('server', () => {
  bs.create();
  bs.init({
    notify: false,
    server: `./${path.build}`,
    open: 'local',
    ui: false
  });
  bs.watch(`${path.build}/**/*`).on('change', bs.reload);
  gulp.watch(`*.*`, {cwd: path.src}, ['file']);
  gulp.watch(`components/**/*`, {cwd: path.src}, ['components']);
  gulp.watch(`image/**/*`, {cwd: path.src}, ['image']);
  gulp.watch(`lib/**/*`, {cwd: path.src}, ['lib']);
  gulp.watch(`utils/**/*`, {cwd: path.src}, ['utils']);
  gulp.watch(`pages/**/*.js`, {cwd: path.src}, ['js']);
  gulp.watch(`pages/**/*.json`, {cwd: path.src}, ['json']);
  gulp.watch(`pages/**/*.html`, {cwd: path.src}, ['html']);
  gulp.watch(`pages/**/*.scss`, {cwd: path.src}, ['sass']);
});


gulp.task('build', (callback) => sequence(
  ['clean'],
  ['assets'],
  ['components'],
  ['image'],
  ['lib'],
  ['utils'],
  callback
));

gulp.task('clean', () => del('./build'));

gulp.task('assets', (callback) => sequence(
  ['file'],
  ['js'],
  ['json'],
  ['html'],
  ['sass'],
  callback
));

gulp.task('file', () => gulp
  .src(`${path.src}/*.*`)
  .pipe(changed(`${oneChatPath}/`))
  .pipe(gulp.dest(`${oneChatPath}/`))
);

gulp.task('components', () => gulp
  .src(`${path.src}/components/**/*`)
  .pipe(changed(`${oneChatPath}/components`))
  .pipe(gulp.dest(`${oneChatPath}/components`))
);

gulp.task('image', () => gulp
  // Select files
    .src(`${path.src}/image/**/*`)
    // Check for changes
    .pipe(changed(`${oneChatPath}/image`))
    // Save files
    .pipe(gulp.dest(`${oneChatPath}/image`))
);

gulp.task('lib', () => gulp
  // Select files
    .src(`${path.src}/lib/**/*`)
    // Check for changes
    .pipe(changed(`${oneChatPath}/lib`))
    // Save files
    .pipe(gulp.dest(`${oneChatPath}/lib`))
);

gulp.task('utils', () => gulp
  // Select files
    .src(`${path.src}/utils/**/*`)
    // Check for changes
    .pipe(changed(`${oneChatPath}/utils`))
    // Save files
    .pipe(gulp.dest(`${oneChatPath}/utils`))
);


gulp.task('html', () => gulp
  // Select files
    .src([`${path.src}/pages/**/*.html`], [`${path.src}/pages/**/*.wxml`])
    // Compile Sass
    .pipe(rename(function (path) {
      path.dirname = 'pages/' +path.dirname;
      path.extname = ".wxml"
    }))
    // Save minified file
    .pipe(gulp.dest(`${oneChatPath}`))
);

gulp.task('js', () => gulp
  // Select files
    .src(`${path.src}/pages/**/*.js`)
  .pipe(rename(function(path) {
    path.dirname = 'pages/' +path.dirname;
  }))
    .pipe(gulp.dest(`${oneChatPath}`))
);

gulp.task('json', () => gulp
  // Select files
    .src(`${path.src}/pages/**/*.json`)
    .pipe(rename(function (path) {
      path.dirname = 'pages/' + path.dirname;
    }))
    .pipe(gulp.dest(`${oneChatPath}`))
);

gulp.task('sass', () => gulp
  // Select files
    .src([`${path.src}/pages/**/*.scss`, `${path.src}/pages/**/*.wxss`])
    // Compile Sass
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    // Add vendor prefixes
    .pipe(postcss([
      autoprefixer,
    ]))
    .pipe(rename(function (path) {
      path.dirname = 'pages/' + path.dirname;
      path.extname = ".wxss";
    }))
    // Save minified file
    .pipe(gulp.dest(`${oneChatPath}`))
);

