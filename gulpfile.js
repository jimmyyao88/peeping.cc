// Gulpfile.js
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    vendor = require('gulp-concat-vendor'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    $ = require('gulp-load-plugins')({
      pattern:[
        'gulp-*',
        'del'
      ]
    });

gulp.task('css', function() {
  return gulp.src('www/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('www/dist'));
});

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
  return gulp.src('www/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('www/dist'));
});

gulp.task('scripts', function() {
  gulp.src('www/resources/**/*.js')
  .pipe(vendor('vendor.js'))
  .pipe(gulp.dest('www/dist'));
});


gulp.task('html', function() {
  return gulp.src('www/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('www/dist'));
});

gulp.task('build',['compress','html','css']);
// gulp.task('compress', function() {
//   return gulp.src('www/dist/vendor.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('www/dist'));
// });
