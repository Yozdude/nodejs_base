var gulp = require('gulp'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    config = require('./config');

// Gulp Plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    install = require('gulp-install'),
    nodemon = require('gulp-nodemon');

// Install NPM and Bower Dependencies
gulp.task('install', function() {
    return gulp.src(['./package.json', './bower.json'])
        .pipe(install());
});

// Run JSHint
gulp.task('lint', function () {
    return gulp.src('private/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass
gulp.task('sass', function () {
    return gulp.src('private/scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.min.css'))
        .pipe(minifyCSS({ keepBreaks: true }))
        .pipe(gulp.dest('public/css'));
});

// Concatenate Third-party CSS
gulp.task('third-party-css', function () {
    return gulp.src(config.thirdParty.css)
        .pipe(concat('third-party.min.css'))
        .pipe(minifyCSS({ keepBreaks: false }))
        .pipe(gulp.dest('public/css'));
});

// Concatenate and Minify Javascript
gulp.task('scripts', function () {
    return gulp.src('private/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Concatenate and Minify Third-Party Javascript
gulp.task('third-party-scripts', function () {
    return gulp.src(config.thirdParty.js)
        .pipe(concat('third-party.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Minify HTML - TEMPORARILY DISABLED
gulp.task('minify-html', function () {
    return gulp.src('html_templates/*.html')
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('html_templates/minified'));
});

// All tasks related to building the project
gulp.task('build', ['lint', 'sass', 'scripts', 'third-party-css', 'third-party-scripts']);

// Run the main project
gulp.task('serve', ['build'], function () {
    nodemon({
        script: 'main.js',
        ext: 'js css scss html',
        tasks: ['build']
    })
    .on('restart', function () {
        browserSync.reload();
    });
});

// Start Browser Sync
gulp.task('browser-sync', ['serve'], function () {
    browserSync.init({
        proxy: 'localhost:' + config.server.hapi.port,
        port: config.server.browserSync.port
    });
});

// Define tasks to be executed immediately
gulp.task('default', ['install', 'browser-sync']);