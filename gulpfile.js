var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    // concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    // clean = require('gulp-clean'),
    livereload = require('gulp-livereload');

gulp.task('compress', function() {
  return gulp.src('src/taxonomy-jquery.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(rename('taxonomy.min.js'));
});
/*
gulp.task('compress', function() {
  return gulp.src(['src/taxonomy.js','src/plugin.js'])
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('taxonomy.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('remove-concat', ['compress'], function(){
    return gulp.src('dist/concat.js')
               .pipe(clean());
});

gulp.task('watch', ['remove-concat'],function() {
  gulp.watch('src/*.js', ['compress']);
  var server = livereload();
  gulp.watch(['src/*.js','example.html']).on('change', function(file) {
      server.changed(file.path);
  });
});
*/
gulp.task('watch',['compress'], function() {
  var server = livereload();
  gulp.watch(['src/*.js','example.html']).on('change', function(file) {
      server.changed(file.path);
  });
});
gulp.task('default', ['watch','compress']);

