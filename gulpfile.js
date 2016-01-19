/**
 * Created by Frontend on 11.12.2015.
 */
"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');

gulp.task("js", function() {
    gulp.src("./assets/js/*.js")
        .pipe(concat("script.min.js"))
        .pipe(uglify()) //min
        .pipe(gulp.dest("./dest"));
});

gulp.task('css', function () {
    gulp.src('./assets/css/*.css')
        .pipe(concat("style.min.css"))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss({compatibility: 'ie8'})) //min
        .pipe(gulp.dest('./dest'));
});



gulp.task("watch", function(){
    gulp.watch("./assets/*.js", ["js"]);
    gulp.watch("./assets/*.css", ["css"]);
});

gulp.task("default", ["css", "js", "watch"]);