'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var path = require('path');

path = {
    root: './',

    src: {
        root: 'src/',
        html: 'src/*.html',
        styles: 'src/styles/**/*.scss'
    },

    dist: {
        root: 'dist/',
        styles: 'dist/css/'
    }
};

gulp.task('connect', function() {
    connect.server({
        root: path.dist.root,
        livereload: true
    });
});

gulp.task('html', function() {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.dist.root))
        .pipe(connect.reload());
});

gulp.task('html:watch', function() {
    gulp.watch([path.src.html], ['html']);
});

gulp.task('sass', function() {
    return gulp.src(path.src.styles)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%','Last 2 versions', 'IE 9'],
            cascade: false
        }))
        .pipe(csscomb())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.dist.styles));
});

gulp.task('sass:watch', function() {
    gulp.watch(path.src.styles, ['sass']);
});

gulp.task('watch', ['html:watch', 'sass:watch']);

gulp.task('default', ['connect', 'watch']);