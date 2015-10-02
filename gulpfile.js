var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

gulp.task('compress', function() {
  return gulp.src('src/taxonomy-jquery.js')
      .pipe(rename('taxonomy.min.js'))
      .pipe(uglify({mangle: true,compress:true}))
      .pipe(gulp.dest('dist'));
});


gulp.task('watch',function() {
  var server = livereload();
  gulp.watch(['src/*.js','example.html'],['compress']).on('change', function(file) {
      server.changed(file.path);
  });
});
gulp.task('default', ['watch','compress']);