/**
 * Watch for file changes and run tasks.
 *
 * Tasks:
 * - Compile SASS files
 * - Aggregate JS files
 * - Puts to destination
 * - Success/error message
 */

"use strict";

module.exports = function(gulp, $, config, messages) {
  gulp.task("watch", function() {
    // Watch for .scss files.
    gulp.watch(config.sass.src, gulp.series("styles"));

    // Watch for .js files.
    gulp.watch(config.javascript.src, gulp.series("scripts"));
  });
};
