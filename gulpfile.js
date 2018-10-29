//Require packages
var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  babel = require('gulp-babel');


//JS -> JS + MIN.JS
//Put a copy and a minified version of JS file in 'dist' folder
gulp.task('jsDist', function () {
  gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015-script']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      message: 'jsDist task complete'
    }));
});

//Put a copy of JS file in 'docs' folder
gulp.task('jsDocs', function () {
  gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015-script']
    }))
    .pipe(gulp.dest('docs'))
    .pipe(notify({
      message: 'jsDocs task complete'
    }));
});

//Task alias
gulp.task('js', ['jsDist', 'jsDocs']);

gulp.task('watchJS', function () {
  gulp.watch('src/js/*.js', ['js']);
});