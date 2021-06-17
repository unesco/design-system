/**
 * Gulp task runner for managing assets in a project.
 *
 * Before running first task make sure you have all node modules installed.
 * To do so navigate to this folder and run the following command:
 *
 * @command: npm install
 *
 * Tasks available :
 *
 * - gulp (default)
 *   First runs the build task to build all the assets,
 *   then runs the watch task to watch for changes on the files.
 *
 * - gulp build
 *   Runs tasks to build all the assets, in parallel.
 */

'use strict';

// Include gulp.
const gulp = require('gulp');

// Config file.
const config = require('./gulp/config.json');

// Auto load all required plugins.
const $ = require('gulp-load-plugins')({
  pattern: '*',
  scope: 'dependencies',
  rename: {
    'jshint': 'jshintCore',
    'jshint-stylish': 'stylish'
  }
});

// Messages data for notify to display.
const messages = {
  error: function (err) {
    $.notify.onError({
      title: config.messages.error.title,
      message: config.messages.error.message
    })(err);

    // If notifier is disabled, still forward the error message.
    if (process.env.DISABLE_NOTIFIER) {
      console.log(err.message);
    }

    this.emit('end');
  },
  success: {
    title: config.messages.success.title,
    message: config.messages.success.message,
    onLast: true
  }
};

// Load tasks from files.
$.loadSubtasks('gulp/tasks/*.js', $, config, messages);

// Gulp build task to run all tasks just once, in parallel.
gulp.task('build', gulp.parallel('styles', 'scripts', 'unesco-script'));

// Default Gulp task to run.
gulp.task('default', gulp.series('build', 'watch'));
