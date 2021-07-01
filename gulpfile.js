'use strict';

var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSyncLib = require('browser-sync');
var pjson = require('./package.json');
var minimist = require('minimist');
var glob = require('glob');

// MisticTool
const through = require('through2');
const path = require('path');
// const minify = require('gulp-minify');


// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
var plugins = gulpLoadPlugins();

var config = pjson.config;
config.defaultNotification = function(err) {
  return {
    subtitle: err.plugin,
    message: err.message,
    sound: 'Funk',
    onLast: true,
  };
};
var args = minimist(process.argv.slice(2));
var dirs = config.directories;
var taskTarget = args.production ? dirs.destination : dirs.temporary;

// Create a new browserSync instance
var browserSync = browserSyncLib.create();

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
glob.sync('./gulp/**/*.js').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require(file)(gulp, plugins, args, config, taskTarget, browserSync);
});

// MisticTool
function base64Encode(){
  return through.obj(function (vinylFile, encoding, callback) {
      // 1. clone new vinyl file for manipulation
      // (See https://github.com/wearefractal/vinyl for vinyl attributes and functions)
      var transformedFile = vinylFile.clone();
  
      var filename = path.parse(transformedFile.path).name;

      // 2. set new contents
      // * contents can only be a Buffer, Stream, or null
      // * This allows us to modify the vinyl file in memory and prevents the need to write back to the file system.
      //transformedFile.contents = Buffer.from(`"${filename}": "${vinylFile.contents.toString('base64')}",`);
      transformedFile.contents = Buffer.from(`window.paletools = window.paletools || {};\nwindow.paletools['${filename}'] = "${vinylFile.contents.toString('base64')}";`);
  
      // 3. pass along transformed file for use in next `pipe()`
      callback(null, transformedFile);
    });
}

gulp.task('mistictool', function () {
  return gulp.src('./src/mistictool/*.js')
          // .pipe(minify())
          .pipe(base64Encode())
//            .pipe(concat('paletools.js'))
//            .pipe(wrap('window.paletools = { <%=contents%> };', {}, { parse: false }))
          .pipe(gulp.dest('./src/mistictool/dist/'));
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

// Build production-ready code
gulp.task('build', [
  'copy',
  'imagemin',
  'jade',
  'sass',
  'browserify'
]);

// Server tasks with watch
gulp.task('serve', [
  'imagemin',
  'copy',
  'jade',
  'sass',
  'mistictool',
  'browserify',
  'browserSync',
  'watch'
]);

// Testing
gulp.task('test', ['eslint']);

