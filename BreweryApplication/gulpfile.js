/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./Content/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest(function (f) {
        return f.base;
    }))
});

gulp.task('default', ['sass'], function () {
    gulp.watch('./Content/**/*.scss', ['sass']);
});