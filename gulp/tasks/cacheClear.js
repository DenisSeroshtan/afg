'use strict';
module.exports = function() {
  $.gulp.task('cacheClear', function(done) {
    return $.gp.cache.clearAll(done);
  });
};