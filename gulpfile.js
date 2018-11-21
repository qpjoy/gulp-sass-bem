let requireDir = require('require-dir');

requireDir('./gulp/tasks', {recurse: true});



// const gulp = require('gulp');
// const plumber = require('gulp-plumber');
// const gutil = require('gulp-util');
// const watch = require('gulp-watch');
//
// const path = {
//   build: 'build',
//   src: 'src'
// };
//
// let origin = path.src;
// let build = path.build;

// const gulpSrc = gulp.src;
//
// gulp.src = function onError(...args) {
//   return gulpSrc
//     .apply(gulp, args)
//     .pipe(plumber(function onError(error) {
//       gutil.log(gutil.colors.red(`Error (${error.plugin}): ${error.message}`));
//     }));
// }


// gulp.task('file', function () {
//   let src = `${path.src}/*.*`;
//   return gulp.src(src)
//     .pipe(watch(src,
//       {ignoreInitial: false,
//         // read:false,
//         events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir','error']}))
//     .pipe(plumber())
//     .pipe(gulp.dest(build));
// });
//
//







// const autoprefixer = require('autoprefixer');
// const babel = require('gulp-babel');
// const bs = require('browser-sync');
// const changed = require('gulp-changed');
// const del = require('del');
// const eslint = require('gulp-eslint');
//
// const include = require('gulp-include');
// const pug = require('gulp-pug');
// const minimist = require('minimist');
// const nano = require('gulp-cssnano');
// const postcss = require('gulp-postcss');
// const rename = require('gulp-rename');
// const sass = require('gulp-sass');
// const sequence = require('run-sequence');
// const uglify = require('gulp-uglify');
//
//
//
//
//
//
// const options = minimist(process.argv.slice(2), {
//   string: ['env'],
//   default: {
//     env: 'dev',
//   },
// });
//
// let oneChatPath = path.build;
// // const renamed = 'notification.wxss';
//
// const gulpSrc = gulp.src;
//
//
//
//
//
//
// gulp.task('default', (callback) => sequence(
//   ['clean'],
//   ['build'],
//   callback
// ));
//
// gulp.task('build', ['assets']);
// // , 'components', 'image', 'lib', 'utils'
//
// gulp.task('clean', () => del('./build'));
//
// gulp.task('assets', ['file']);
// // , 'js', 'json', 'html', 'sass'
//
// // gulp.task('file', () => {
// //   let src = `${path.src}/*.*`;
// //   return gulp
// //         .src(src)
// //         .pipe(watch([src], {ignoreInitial: false, read:false, events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir','error']}))
// //         .pipe(changed(`${oneChatPath}/`))
// //         .pipe(gulp.dest(`${oneChatPath}/`))
// //   }
// // );
//
//
// gulp.task('file', () => {
//   let src = `${path.src}/*.*`;
//   return watch(src, {ignoreInitial: false, read:false, events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir','error']})
//       .pipe(changed(`${oneChatPath}/components`))
//       .pipe(gulp.dest(`${oneChatPath}/components`));
// });
// //
// // gulp.task('components', () => {
// //   let src = `${path.src}/components/**/*`;
// //   return watch(src, () => {
// //     gulp
// //       .src(src)
// //       .pipe(changed(`${oneChatPath}/components`))
// //       .pipe(gulp.dest(`${oneChatPath}/components`))
// //   })
// // }
// // );
// //
// // gulp.task('image', () => {
// //   let src = `${path.src}/image/**/*`;
// //   return watch(src, () => {
// //     gulp
// //     // Select files
// //       .src(src)
// //       // Check for changes
// //       .pipe(changed(`${oneChatPath}/image`))
// //       // Save files
// //       .pipe(gulp.dest(`${oneChatPath}/image`))
// //   })
// // }
// // );
// //
// // gulp.task('lib', () => {
// //     let src  = `${path.src}/lib/**/*`;
// //     return watch(src, () => {
// //       gulp.src(src)
// //       // Check for changes
// //         .pipe(changed(`${oneChatPath}/lib`))
// //         // Save files
// //         .pipe(gulp.dest(`${oneChatPath}/lib`))
// //     })
// // }
// //
// // );
// //
// // gulp.task('utils', () => {
// //   let src  =`${path.src}/utils/**/*`;
// //   return watch(src, () => {
// //     gulp.src(src).pipe(changed(`${oneChatPath}/utils`))
// //     // Save files
// //       .pipe(gulp.dest(`${oneChatPath}/utils`))
// //   })
// // }
// // );
//
//
// gulp.task('html', () => {
//   let src = `${path.src}/pages/**/*{.wxml,.html}`;
//   return watch(src, () => {
//     gulp.src(src)
//       // Compile Sass
//       .pipe(rename(function (path) {
//         path.dirname = 'pages/' +path.dirname;
//         path.extname = ".wxml"
//       }))
//       // Save minified file
//       .pipe(gulp.dest(`${oneChatPath}`))
//   });
// }
//
// );
//
// gulp.task('js', () => {
//   let src = `${path.src}/pages/**/*.js`
//   return watch(src, () => {
//     gulp
//       .src(src)
//       .pipe(rename(function(path) {
//         path.dirname = 'pages/' +path.dirname;
//       }))
//       .pipe(gulp.dest(`${oneChatPath}`))
//   });
// }
// );
//
// gulp.task('json', () => {
//   let src = `${path.src}/pages/**/*.json`;
//   return watch(src, () => {
//     gulp
//       .src(src)
//       .pipe(rename(function (path) {
//         path.dirname = 'pages/' + path.dirname;
//       }))
//       .pipe(gulp.dest(`${oneChatPath}`))
//   })
// }
// );
//
// gulp.task('sass', () => {
//   let src  = `${path.src}/pages/**/*{*.wxss,.scss}`;
//   return watch(src, () => {
//     gulp
//     // Select files
//       .src([, `${path.src}/pages/**/*.wxss`])
//       // Compile Sass
//       .pipe(sass({
//         outputStyle: 'expanded',
//       }))
//       // Add vendor prefixes
//       .pipe(postcss([
//         autoprefixer,
//       ]))
//       .pipe(rename(function (path) {
//         path.dirname = 'pages/' + path.dirname;
//         path.extname = ".wxss";
//       }))
//       // Save minified file
//       .pipe(gulp.dest(`${oneChatPath}`))
//   });
// }
// );
//
//
// gulp.task('watch', function() {
//
// })

