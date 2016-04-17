// Gulpfile.js
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');
  gulp.task('lint', function () {
    gulp.src('./*.js')
      .pipe(jshint());
  });


gulp.task('default', function () {
  nodemon({ script: 'app.js'
          , ext: 'html js'
          , ignore: ['node_modules/']
          , tasks: ['lint'] })
    .on('restart', function () {
      console.log('restarted!');
    });
});
