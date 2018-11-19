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
  gulp.watch(`./${path.src}/data/**/*`, ['data']);
  gulp.watch(`./${path.src}/fonts/**/*`, ['fonts']);
  gulp.watch(`./${path.src}/images/**/*`, ['images']);
  gulp.watch(`./${path.src}/media/**/*`, ['media']);
  gulp.watch(`./${path.src}/misc/**/*`, ['misc']);
  gulp.watch(`./${path.src}/scripts/**/*.js`, ['scripts']);
  gulp.watch(`./${path.src}/styles/**/*.scss`, ['styles']);
  gulp.watch(`./${path.src}/vendors/*.js`, ['vendors']);
  gulp.watch(`./${path.src}/views/**/*.pug`, ['views']);
});


gulp.task('build', (callback) => sequence(
  ['clean'],
  ['assets'],
  ['scripts'],
  ['styles'],
  ['vendors'],
  ['views'],
  callback
));

gulp.task('clean', () => del('./build'));

gulp.task('assets', (callback) => sequence(
  ['data'],
  ['fonts'],
  ['images'],
  ['media'],
  ['misc'],
  callback
));

gulp.task('data', () => gulp
  .src(`${path.src}/data/**/*`)
  .pipe(changed(`${path.build}/data`))
  .pipe(gulp.dest(`${path.build}/data`))
);

gulp.task('fonts', () => gulp
  .src(`${path.src}/fonts/**/*`)
  .pipe(changed(`${path.build}/fonts`))
  .pipe(gulp.dest(`${path.build}/fonts`))
);

gulp.task('images', () => gulp
  // Select files
    .src(`${path.src}/images/**/*`)
    // Check for changes
    .pipe(changed(`${path.build}/images`))
    // Save files
    .pipe(gulp.dest(`${path.build}/images`))
);

gulp.task('media', () => gulp
  // Select files
    .src(`${path.src}/media/**/*`)
    // Check for changes
    .pipe(changed(`${path.build}/media`))
    // Save files
    .pipe(gulp.dest(`${path.build}/media`))
);


gulp.task('misc', () => gulp
  // Select files
    .src([
      `${path.src}/misc/${options.env}/**/*`,
      `${path.src}/misc/all/**/*`,
    ], {
      dot: true,
    })
    // Check for changes
    .pipe(changed(path.build))
    // Save files
    .pipe(gulp.dest(path.build))
);


gulp.task('scripts', ['scripts-lint'], () => gulp
  // Select files
    .src(`${path.src}/scripts/*.js`)
    // Concatenate includes
    .pipe(include())
    // Transpile
    .pipe(babel())
    // Save unminified file
    .pipe(gulp.dest(`${path.build}/scripts`))
    // Optimize and minify
    .pipe(uglify())
    // Append suffix
    .pipe(rename({
      suffix: '.min',
    }))
    // Save minified file
    .pipe(gulp.dest(`${path.build}/scripts`))
);


gulp.task('scripts-lint', () => gulp
  // Select files
    .src(`${path.src}/scripts/**/*.js`)
    // Check for errors
    .pipe(eslint())
    // Format errors
    .pipe(eslint.format())
);


gulp.task('styles', () => gulp
  // Select files
    .src(`${path.src}/styles/*.scss`)
    // Compile Sass
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    // Add vendor prefixes
    .pipe(postcss([
      autoprefixer,
    ]))
    // Save unminified file
    .pipe(gulp.dest(`${path.build}/styles`))
    // Optimize and minify
    .pipe(nano())
    // Append suffix
    .pipe(rename({
      suffix: '.min',
    }))
    // Save minified file
    .pipe(gulp.dest(`${path.build}/styles`))
);


gulp.task('vendors', () => gulp
  // Select files
    .src(`${path.src}/vendors/*.js`)
    // Concatenate includes
    .pipe(include({
      includePaths: [
        `${__dirname}/bower_components`,
        `${__dirname}/node_modules`,
      ],
    }))
    // Save files
    .pipe(gulp.dest(`${path.build}/vendors`))
);


gulp.task('views', () => gulp
  // Select files
    .src(`${path.src}/views/site/**/*.pug`)
    // Check which files have changed
    .pipe(changed(path.build, {
      extension: '.html',
    }))
    // Compile Pug
    .pipe(pug({
      basedir: `${__dirname}/${path.src}/views`,
      pretty: (options.env === 'dev'),
      data: {
        env: options.env,
      },
    }))
    // Save files
    .pipe(gulp.dest(path.build))
);





// const options = minimist(process.argv.slice(2), {
//   string: ['env'],
//   default: 'dev'
// })
//
// gulp.task('sass', function () {
//   gulp.src('devwp/sass/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('devwp'));
// });
//
// gulp.task('sass:watch', function () {
//   gulp.watch('devwp/sass/**/*.scss', ['sass']);
// })
//
// gulp.task('default', function () {
//
// });