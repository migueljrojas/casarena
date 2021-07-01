'use strict';

var path = require('path');
// const through = require('through2');
// const minify = require('gulp-minify');

// function base64Encode(){
//   return through.obj(function (vinylFile, encoding, callback) {
//       // 1. clone new vinyl file for manipulation
//       // (See https://github.com/wearefractal/vinyl for vinyl attributes and functions)
//       var transformedFile = vinylFile.clone();
  
//       var filename = path.parse(transformedFile.path).name;

//       // 2. set new contents
//       // * contents can only be a Buffer, Stream, or null
//       // * This allows us to modify the vinyl file in memory and prevents the need to write back to the file system.
//       //transformedFile.contents = Buffer.from(`"${filename}": "${vinylFile.contents.toString('base64')}",`);
//       transformedFile.contents = Buffer.from(`window.paletools = window.paletools || {};\nwindow.paletools['${filename}'] = "${vinylFile.contents.toString('base64')}";`);
  
//       // 3. pass along transformed file for use in next `pipe()`
//       callback(null, transformedFile);
//     });
// }

// gulp.task('mistictool', function () {
//   return gulp.src('./src/mistictool/*.js')
//           .pipe(minify())
//           .pipe(base64Encode())
//           .pipe(gulp.dest('./src/mistictool/dist/'));
// });

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;

  // Watch task
  gulp.task('watch', function() {
    if (!args.production) {
      // Styles
      gulp.watch([
        path.join(dirs.source, dirs.styles, '**/*.{scss,sass}'),
        path.join(dirs.source, dirs.modules, '**/*.{scss,sass}')
      ], ['sass']);

      // Jade Templates
      gulp.watch([
        path.join(dirs.source, '**/*.jade'),
        path.join(dirs.source, dirs.data, '**/*.{json,yaml,yml}')
      ], ['jade']);

      // Copy
      gulp.watch([
        path.join(dirs.source, '**/*'),
        '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}'),
        '!' + path.join(dirs.source, '**/*.jade')
      ], ['copy']);

      // Images
      gulp.watch([
        path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}')
      ], ['imagemin']);

      // All other files
      gulp.watch([
        path.join(dirs.temporary, '**/*'),
        '!' + path.join(dirs.temporary, '**/*.{css,map,html,js}')
      ]).on('change', browserSync.reload);

      // gulp.watch([
      //   path.join(dirs.temporary, '**/*'),
      //   '!' + path.join(dirs.temporary, '**/*.{css,map,html,js}')
      // ]).on('change', mistictool);
    }
  });
};
