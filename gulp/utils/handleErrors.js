const notifier = require('node-notifier');
const gutil = require('gulp-util');
const path = require('path');

function logError(err) {
  notifier.notify({
    title: err.title || 'Error: handler',
    message: err.message,
    icon: path.join(__dirname, 'gulp.png')
  });

  gutil.log(err.title + '\n' + gutil.colors.red(err.message));

  if(typeof this.emit === 'function') this.emit('end');
}

module.exports = logError;


// var notify = require('gulp-notify')
//
// module.exports = function () {
//   var args = Array.prototype.slice.call(arguments)
//
//   // Send error to notification center with gulp-notify
//   notify.onError({
//     title: 'Flynt Compile Failed',
//     subtitle: '<%= error.plugin %>: <%= error.name %>',
//     message: '<%= error.message %>'
//   }).apply(this, args)
//
//   // Keep gulp from hanging on this task
//   if (typeof this.emit === 'function') {
//     this.emit('end')
//   }
// }