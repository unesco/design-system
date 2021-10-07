/**
 * Task to concate and verify scripts.
 *
 * Tasks:
 * - Verify scripts for errors
 * - Concate application scripts
 * - Sourcemaps
 * - Success/error message
 */

"use strict";

module.exports = function(gulp, $, config, messages) {
  gulp.task("unesco-script", function() {
    return gulp
      .src(config.unescoJavascript.src)
      .pipe(
        $.plumber({
          errorHandler: messages.error
        })
      )
      .pipe($.jshint())
      .pipe($.jshint.reporter($.stylish))
      .pipe($.jshint.reporter("fail"))
      .pipe($.sourcemaps.init())
      .pipe($.concat(config.unescoJavascript.file))
      .pipe($.sourcemaps.write(config.unescoJavascript.sourcemaps))
      .pipe(gulp.dest(config.unescoJavascript.destination))
      .pipe($.notify(messages.success));
  });
};

