const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
 
gulp.task('sass', function () {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
});

// gulp.task('swiper', function() {
//   return gulp.src('node_modules/swiper/**')
//     .pipe(gulp.dest('src/swiper/'))
// })
 
gulp.task('default', function () {
  // gulp.watch('./src/scss/**/*.scss', gulp.series( 'sass','swiper'));
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
});