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
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync').create();

var onError = notify.onError({
  message: 'Error: <%= error.message %>'
});

var src = {
  scss: 'src/scss/**/*.scss',
  js: ['src/js/*.js', 'src/js/components/**/*.vue'],
  jsApp: 'src/js/app.js',
  img: 'src/img/**/*.{png,jpg,jpeg}',
  audio: 'src/audio/*.*',
  video: 'src/video/*.*',
  font: 'src/font/**.*',
  html: 'src/*.html',
  partials: 'src/partials/*.html'
};

var dist = {
  css: 'dist/css',
  js: 'dist/js',
  img: 'dist/img',
  audio: 'dist/audio',
  video: 'dist/video',
  font: 'dist/font',
  html: 'dist'
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

// Browserify
gulp.task('browserify', function() {
  return browserify(src.jsApp)
    .transform(vueify)
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest(dist.js));
});
gulp.task('rescript', ['browserify'], function () {
  browserSync.reload();
});

// Static server
gulp.task('serve', ['build', 'images', 'audio', 'video', 'fonts', 'scss', 'browserify'], function() {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch(src.scss, ['scss']);
  gulp.watch(src.js, ['rescript']);
  gulp.watch(src.img, ['images']);
  gulp.watch([src.partials, src.html], ['rebuild']);
});

// Default task
gulp.task('default', ['serve']);
