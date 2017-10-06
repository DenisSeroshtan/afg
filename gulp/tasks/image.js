'use strict';

module.exports = function() {
  $.gulp.task('image', function() {
    return $.gulp.src($.config.src.img)
        .pipe($.gp.cache($.gp.imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [$.gp.pngquant()]
        })))      
      .pipe($.gulp.dest($.config.root + $.config.dist.img));
  });
};
