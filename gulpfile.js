'use strict';
global.$ = {
  YOUR_LOCALS: require('./content.json'),
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  rimraf: require('rimraf'),
  fs: require('fs'),
  gsmq: require('gulp-group-css-media-queries'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass',
        'pug',
        'js:foundation',
        'css:foundation',
        'js:process',
        'image',
        'fonts'
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));

$.gulp.task('server', $.gulp.parallel(
    'watch',
    'serve'
));