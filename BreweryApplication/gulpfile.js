//var gulp = require('gulp'),
//    sass = require('gulp-sass');

//gulp.task('sass', function () {
//    gulp.src('./Content/**/*.scss')
//    .pipe(sass())
//    .pipe(gulp.dest(function (f) {
//        return f.base;
//    }))
//});

//gulp.task('default', ['sass'], function () {
//    gulp.watch('./Content/**/*.scss', ['sass']);
//});



var gulp = require('gulp'); // require gulp
var sass = require('gulp-sass');
var watcher = require('gulp-watch');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

// use gulp-watch to watch for changes
// the first argument is an array of strings
// that represent fodlers/files to watch
watcher(['./Content/**/*.scss'], function () {
    console.log('App has been modified. Re-running tasks');
    gulp.start('scss-2-css');
})

watcher(['./scripts/source/**/*.js'], function () {
    console.log('App has been modified; re-compiling');
    gulp.start('default');
})
/*
Create a new task
TWo Areguments:  Name(String), callback (Function)
*/

gulp.task('default', function () {
    return browserify('./scripts/source/source.js')
          .transform("babelify", { presets: ["es2015", "react"] })
          .bundle()
          .pipe(source('app.js'))
          .pipe(gulp.dest('./scripts/'))
});


gulp.task('scss-2-css', function () {
    // have gulp find the source (src) files
    gulp.src('./Content/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./Content/'));
});


    