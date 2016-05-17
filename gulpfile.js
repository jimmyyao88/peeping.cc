// Gulpfile.js
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    vendor = require('gulp-concat-vendor'),
    htmlmin = require('gulp-htmlmin');
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

gulp.task('compress', function() {
  return gulp.src('www/resources/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('www/dist'));
});

gulp.task('scripts', function() {
  gulp.src('www/resources/**/*.js')
  .pipe(vendor('vendor.js'))
  .pipe(gulp.dest('www/dist'));
});


gulp.task('minify', function() {
  return gulp.src('www/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('www/dist'));
});


// gulp.task('compress', function() {
//   return gulp.src('www/dist/vendor.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('www/dist'));
// });
