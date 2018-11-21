let path = require('path');

let source = 'src';

let destination = 'build';

let webroot = '';


let options = {
  name: 'gulp-bem',
  static: {

  },
  sass: {

  },

  source: source,
  destination: destination,
  copy: [`${source}/**/*`, `!${source}/pages/**/*`, `!${source}/**/*.scss`]
};

module.exports = options;