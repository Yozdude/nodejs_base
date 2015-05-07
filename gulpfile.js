var gulp = require('gulp'); 

// Plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    install = require('gulp-install');

// JSHint Task
gulp.task('lint', function() {
    return gulp.src('private/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Install Task
gulp.task('install', function() {
    return gulp.src(['./bower.json'])
        .pipe(install());
});

// Compile Sass
gulp.task('sass', function() {
    return gulp.src('private/scss/*.scss')
        .pipe(sass())
        .pipe(concat('all.min.css'))
        .pipe(minifyCSS({ keepBreaks: true }))
        .pipe(gulp.dest('public/css'));
});

// Concatenate Third-party CSS
gulp.task('third-party-css', function() {
    return gulp.src(['bower_components/*/lib/*.css'
                     'third-party-libraries/*.css'])
        .pipe(concat('third-party.min.css'))
        .pipe(minifyCSS({ keepBreaks: false }))
        .pipe(gulp.dest('public/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('private/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Concatenate Third-party JS
gulp.task('third-party-scripts', function() {
    return gulp.src(['bower_components/*/lib/*.js',
                     'third-party-libraries/*.js'])
        .pipe(concat('third-party.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    //gulp.watch('private/js/*.js', ['lint', 'scripts']);
    //gulp.watch('private/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'install', 'sass', 'third-party-css', 'scripts', 'third-party-scripts', 'watch']);