var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

gulp.task('compress',function() {
  return gulp.src('src/taxonomy-jquery.js')
    .pipe(rename('taxonomy.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({mangle: true,compress:true}));
});
gulp.task('watch',function() {
  var server = livereload();
  gulp.watch(['src/*.js','example.html'],['compress']).on('change', function(file) {
      server.changed(file.path);
  });
});
gulp.task('default', ['watch','compress']);