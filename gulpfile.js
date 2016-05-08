var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var lost = require('lost');
var notify = require('gulp-notify');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserify = require('browserify');
var vueify = require('vueify');
var debowerify = require('debowerify');
var deamdify = require('deamdify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var del = require('del');
var browserSync = require('browser-sync').create();

var onError = notify.onError({
  message: 'Error: <%= error.message %>'
});

var src = {
  scss: 'src/scss/**/*.scss',
  scssExternal: '../data/*.scss',
  js: ['src/js/*.js', 'src/js/components/**/*.vue', '../data/*.js'],
  jsApp: 'src/js/app.js',
  jsVendor: 'src/js/vendor/*.js',
  img: '../media/img/**/*.{png,jpg,jpeg}',
  audio: '../media/audio/*.*',
  video: '../media/video/*.*',
  font: 'src/font/**.*',
  html: 'src/*.html',
  favicon: 'src/favicon.ico',
  partials: 'src/partials/*.html'
};

var dist = {
  css: '../../dist/css',
  js: '../../dist/js',
  img: '../../dist/img',
  audio: '../../dist/audio',
  video: '../../dist/video',
  font: '../../dist/font',
  html: '../../dist'
};

// Compile sass into CSS
gulp.task('scss', function() {
  return gulp.src(src.scss)
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass())
    .pipe(plumber.stop())
    .pipe(notify({
      title: "Scss",
      message: "Styles compiled successfully",
      onLast: true
    }))
    .pipe(postcss([
      lost(),
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist.css))
    .pipe(browserSync.stream({
      match: '**/*.css'
    }));
});

// Markup
gulp.task('build', function() {
  return gulp.src(src.html)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: true
    }))
    .pipe(gulp.dest(dist.html));
});
gulp.task('rebuild', ['build'], function() {
  browserSync.reload();
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src(src.font)
    .pipe(gulp.dest(dist.font))
});

// Favicon
gulp.task('favicon', function() {
  return gulp.src(src.favicon)
    .pipe(gulp.dest(dist.html))
});

// Images
gulp.task('images', function() {
  return gulp.src(src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dist.img));
});

// Audio
gulp.task('audio', function() {
  return gulp.src(src.audio)
    .pipe(gulp.dest(dist.audio))
});

// Video
gulp.task('video', function() {
  return gulp.src(src.video)
    .pipe(gulp.dest(dist.video))
});

// Vendor scripts
gulp.task('vendor', function() {
  return gulp.src(src.jsVendor)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dist.js))
});

// Browserify
gulp.task('browserify', function() {
    var b = browserify({
        entries: src.jsApp,
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [vueify, debowerify, deamdify]
      });
  return b.bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest(dist.js));
});
gulp.task('rescript', ['browserify'], function () {
  browserSync.reload();
});

// Clean task
gulp.task('clean', function () {
  return del('dist/**/*');
});

// Static server
gulp.task('serve', ['build', 'images', 'audio', 'video', 'fonts', 'favicon', 'scss', 'vendor', 'browserify'], function() {

  browserSync.init({
    server: "../../dist"
  });

  gulp.watch([src.scss, src.scssExternal], ['scss']);
  gulp.watch(src.js, ['rescript']);
  gulp.watch(src.img, ['images']);
  gulp.watch([src.partials, src.html], ['rebuild']);
});

// Default task
gulp.task('default', ['serve']);
