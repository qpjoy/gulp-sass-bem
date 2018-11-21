const gulp = require('gulp');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const options = require('../options');
const handleError = require('../utils/handleErrors');
const fs = require('fs');
const path = require('path');
const del = require('del');
const notifier = require('node-notifier');

let source = options.source;
let destination = options.destination;


const extensionMappings = {
  '.styl': '.css'
}
//
//
//
// var deleteFolderRecursive = function(path) {
//   if(fs.existsSync(path)) {
//     fs.readdirSync(path).forEach(function(file,index) {
//       var curPath = path + "/" + file;
//       if(fs.lstatSync(curPath).isDirectory()) { // recurse
//         deleteFolderRecursive(curPath);
//       } else { // delete file
//         fs.unlinkSync(curPath);
//       }
//     });
//     fs.rmdirSync(path);
//   }
// };
//
function watchAndDelete (src, callback, dest) {
  return watch(src, {
    events: ['add', 'change', 'unlink', 'unlinkDir']
  }, callback)
    .on('data', function (file) {
      if (file.event === 'unlink') {

        console.log('unlink !!!', file);
        const filePath = path.join(dest, file.relative)
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath)
        }
        if (extensionMappings[file.extname]) {
          const relativeDest = path.dirname(filePath)
          const mappedFilePath = path.join(relativeDest, file.stem + extensionMappings[file.extname])
          if (fs.existsSync(mappedFilePath)) {
            fs.unlinkSync(mappedFilePath)
          }
        }
      }
      if (file.event === 'unlinkDir') {
        console.log('unlink !!!', file);

        const dirPath = path.join(dest, file.relative)
        if (fs.existsSync(dirPath)) {
          fs.rmdirSync(dirPath)
        }
      }
      if (file.event === 'add') {
        console.log('adding file')
        // addFile();
        // gulp.start('copy')
      }
    })
}
function addFile(file){
  console.log(file,"added");
  gulp.src(file, {base : './'+source}) //指定这个文件
    .pipe(gulp.dest('./'+destination))
}
//
//
//
//
//
// function changeFile(file){
//   console.info(file,"changed");
//
//   let isJs = file.lastIndexOf(".js") > -1;
//   let isHtml = file.lastIndexOf(".html") > -1;
//   let isScss = file.lastIndexOf(".scss") > -1;
//   let isCss = file.lastIndexOf(".css") > -1;
//
//   if( isJs ){
//     gulp.src(file, {base : './'+sourcePath}) //指定这个文件
//       .pipe(plumber({
//         errorHandler : function (error) {
//           console.log(error)
//           this.emit('end');
//         }
//       }))
//       // translate es5
//       .pipe( babel(app.babel) )
//       .pipe(gulp.dest('./'+sourceBuild))
//       .pipe(reload({stream: true}))
//       .pipe(md5(10, sourceBuild+'/**/*.html'))
//   }else if( isScss) {
//
//     gulp.src(sourcePath+"/scss/*.scss")
//       .pipe(changed(sourceBuild+'/css/'))
//       // 生成css对应的sourcemap
//       .pipe(sourcemaps.init())
//       .pipe(sass(app.sass).on('error', sass.logError))
//       .pipe(autoprefixer(app.autoprefixer))
//       .pipe(sourcemaps.write('./'))
//       .pipe(gulp.dest(sourceBuild+"/css"))
//       .pipe(reload({stream: true}));
//
//   }else if( isHtml ) {
//
//     gulp.src(file, {base : './'+sourcePath})
//       .pipe(plumber())
//       .pipe(htmlmin(app.htmlmin))
//       .pipe(gulp.dest('./'+sourceBuild))
//       .pipe(md5(10))
//       .pipe(reload({stream: true}))
//   }else if( isCss ) {
//
//     gulp.src(file, {base : './'+sourcePath})
//       .pipe(gulp.dest('./'+sourceBuild))
//       .pipe(md5(10, sourceBuild+"/**/*.html"))
//       .pipe(reload({stream: true}))
//   }else{
//     gulp.src(file, {base : './'+sourcePath})
//       .pipe(gulp.dest('./'+sourceBuild))
//       .pipe(reload({stream: true}))
//   }
//
// }
//
//
//
//
// let srcOpt = [`${source}/**/*`, `!${source}/pages/**/*`, `!${source}/**/*.scss`];
//
// gulp.task('file', function () {
//   console.log('in file');
//   return gulp.src(srcOpt)
//     .pipe(plumber())
//     .pipe(gulp.dest(`${destination}`));
// });
//
// gulp.task('copy:file', ['file'], () => {
//
//   // watch(srcOpt, {
//   //   ignoreInitial: false,
//   //   // read:false,
//   //   events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir', 'error']
//   // }).on('add', addFile)
//   //   .on('change', changeFile)
//   //   .on('unlink', function (file) {
//   //     console.log('unlink');
//   //     //删除文件
//   //     let distFile = './build/test1.txt'; //计算相对路径
//   //     fs.existsSync(distFile) && fs.unlink(distFile);
//   //     console.warn(file, "deleted")
//   //   });
//
//   // watch(srcOpt,
//   //   {
//   //     ignoreInitial: false,
//   //     // read:false,
//   //     events: ['add', 'change', 'unlink', 'addDir', 'unlinkDir', 'error']
//   //   },
//   //   (f) => {
//   //     if (f.event === 'unlink') {
//   //       console.log(e, '  - - - -this is e ');
//   //       let _path = v.history[0].replace('\src', '\build');
//   //       del(_path);
//   //
//   //       // const fileToDelete = f.path;
//   //       // if(fs.existsSync(fileToDelete)) {
//   //       //   fs.unlinkSync(fileToDelete);
//   //       // }
//   //       return;
//   //     }
//   //   }
//   // );
// });
//


gulp.task('watch:files', function() {
  watchAndDelete(options.copy, function () {
    gulp.start('copy');
  }, options.destination);
})