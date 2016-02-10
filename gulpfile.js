"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var stylus = require('gulp-stylus');// stylus to compile styl to css
var nib = require('nib')

var config = {
  port: 3000,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    js: './src/**/**/*.js',
    jsx: './src/**/**/*.jsx',
    images: './src/images/*',
    styl: './src/styles/*.styl',
    stylimport: './src/styles/imports.styl',
    css: [
          './src/styles/discovery.css'
      ],
    build: './build',
    mainJs: './src/main.js'
  }
}

//Start a local development server
gulp.task('connect', function() {
  connect.server({
    root: ['build'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

gulp.task('open', ['connect'], function() {
  gulp.src('build/index.html')
    .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.build))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('script.js'))
    .pipe(gulp.dest(config.paths.build + '/js'))
    .pipe(connect.reload());
});

// gulp.task('css', function() {
//  gulp.src(config.paths.css)
//    .pipe(concat('bundle.css'))
//    .pipe(gulp.dest(config.paths.build + '/css'));
// });

gulp.task('styl', function () {
  gulp.src(config.paths.stylimport)
    .pipe(stylus())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(config.paths.build + '/css'))
    .pipe(connect.reload());
});
 

// Migrates images to build folder
// Note that I could even optimize my images here
gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.build + '/images'))
        .pipe(connect.reload());

    //publish favicon
    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.build));
});

gulp.task('lint', function() {
  return gulp.src(config.paths.js)
    .pipe(lint({config: 'eslint.config.json'}))
    .pipe(lint.format());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.images, ['images']);
  gulp.watch(config.paths.styl, ['styl']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.jsx, ['js', 'lint']);
});

gulp.task('default', ['html', 'js', 'styl', 'images', 'lint', 'open', 'watch']);