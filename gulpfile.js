var gulp = require('gulp');
var webpack = require('webpack-stream');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var htmlreplace = require('gulp-html-replace');
var gulpSequence = require('gulp-sequence');
var gulpif = require('gulp-if');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var template = require('gulp-template');
var rename = require('gulp-rename');
var nightwatch = require('gulp-nightwatch');
var shell = require('gulp-shell');
var webpackDev = require('./webpack/webpack.dev.js');
var webpackProd = require('./webpack/webpack.prod.js');

var conf = require('./config/config.json');

var config = {
  // Production mode is disabled when running default task (dev mode)
  PRODUCTION: true,
  // Development server port
  PORT: 3000,
  // Relative paths to sources and output directories
  BOWER: './bower_components',
  DIR: 'app/',
  SRC_DIR: 'app/src/',
  SASS_DIR: 'app/sass/',
  ASSETS_DIR: 'app/assets/',
  HTML_DIR: 'app/html/',
  MAIN_SASS_FILE : 'app.scss',
  BUILD_DIR: 'app/.tmp/',
  IMAGE_DIR: 'images/',
  TEST: 'tests/',
  DIST: 'dist/',
  DIST_DIR_JS: 'dist/scripts/',
  DIST_DIR_CSS: 'dist/styles/',
  DIST_DIR_ASSETS: 'dist/assets/',
  SCRIPTS_JS_NAME: 'scripts.js',
  STYLES_CSS_NAME: 'styles.css',
  ENTRY_POINT_FILE: 'app/src/main.js',
  WEBPACK_CONFIG:webpackProd,

  root: function(path) {
    return this.DIR + path;
  },
  src: function(path) {
    return this.SRC_DIR + path;
  },
  html: function(path) {
    return this.HTML_DIR + path;
  },
  sass: function(path) {
    return this.SASS_DIR + path;
  },
  assets: function(path) {
    return this.ASSETS_DIR + path;
  },
  images: function(path) {
    return this.ASSETS_DIR + this.IMAGE_DIR + path;
  },
  dist: function(path) {
    return this.DIST + path;
  },
  destJS: function(path) {
    return this.BUILD_DIR_JS + path;
  },
  destCSS: function(path) {
    return this.BUILD_DIR_CSS + path;
  }
};

// Callback function for Plumber
function syntaxError(error){
    notify.onError({title: "Error", message: error.Message, sound: "Pop"})(error);
    console.log(error.toString());
    this.emit("end");
};

// Styles
gulp.task('styles', function()
{
    return gulp.src(config.SASS_DIR+config.MAIN_SASS_FILE)
    .pipe(plumber({errorHandler: syntaxError}))
    .pipe(sass())
    .pipe(
      gulpif(config.PRODUCTION, minifyCSS())
    )
    .pipe(concat(config.STYLES_CSS_NAME))
    .pipe(
      gulpif(!config.PRODUCTION, gulp.dest(config.BUILD_DIR))
    )
    .pipe(
      gulpif(config.PRODUCTION, gulp.dest(config.DIST_DIR_CSS))
    )
    .pipe(
      gulpif(!config.PRODUCTION, browserSync.reload({ stream: true }))
    );

});

// Webpack
gulp.task('webpack', function(){
  return gulp.src(config.ENTRY_POINT_FILE)
    .pipe(plumber({errorHandler: syntaxError}))
    .pipe(webpack(config.WEBPACK_CONFIG))
    .pipe(
      gulpif(!config.PRODUCTION, gulp.dest(config.BUILD_DIR))
    )
    .pipe(
      gulpif(config.PRODUCTION, gulp.dest(config.DIST_DIR_JS))
    )
    .pipe(
      gulpif(!config.PRODUCTION, browserSync.reload({ stream: true }))
    );
});

// Html Files
gulp.task('html', function() {
  return gulp.src(config.html('template.html'))
    .pipe(
      gulpif(!config.PRODUCTION,template(conf.dev))
    )
    .pipe(
      gulpif(config.PRODUCTION,template(conf.prod))
    )
    .pipe(
      gulpif(config.PRODUCTION, htmlreplace({
        'css': 'styles/styles.css',
        'js': 'scripts/scripts.js'
    })))
    .pipe(rename('index.html'))
    .pipe(
      gulpif(config.PRODUCTION, gulp.dest(config.DIST))
    )
    .pipe(
      gulpif(!config.PRODUCTION, gulp.dest(config.DIR))
    )
    .pipe(
      gulpif(!config.PRODUCTION, browserSync.reload({ stream: true }))
    );
});

// Assets
gulp.task('assets', function() {
  return gulp.src([config.assets('**/*'),'!'+config.assets('images')]).pipe(gulp.dest(config.DIST_DIR_ASSETS));
});

// Images
gulp.task('images', function () {
        return gulp.src(config.images('*'))
          .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
          }))
          .pipe(gulp.dest(config.DIST_DIR_ASSETS+config.IMAGE_DIR));
});

// Clean
gulp.task('clean', function (cb) {
        return del(config.DIST, cb);
});

// Notify
gulp.task('notify', function () {
        return gulp.src("")
        .pipe(notify({ message: 'Build Success'}));
});

// Browser Sync
gulp.task('server', ['run'], function() {

  browserSync({
    port: config.PORT,
    server: {
      baseDir: config.DIR
    }
  });

  // Watch Files
  gulp.watch([config.src('**/*.vue'),config.src('**/*.js')], ['webpack']);
  gulp.watch(config.sass('**/**/*.scss'), ['styles']);
  gulp.watch(config.html('template.html'), ['html']);

})

//

gulp.task('test:serve',function(){
  return gulp.src('')
      .pipe(shell('npm run serve'));
})

gulp.task('test:unit',function(){
  return gulp.src('')
      .pipe(shell('npm run testunit'));
})

gulp.task('test:e2e',function(){
  return gulp.src('')
      .pipe(nightwatch({
        configFile: config.TEST+'nightwatch.json'
      }));
})

gulp.task('dev', function() {
  config.PRODUCTION = false;
  config.WEBPACK_CONFIG = webpackDev;
});

gulp.task('run', ['webpack','styles','html']);
gulp.task('build', gulpSequence('clean', 'run','assets','images','notify'));

/*Default task - development mode*/
gulp.task('default', ['dev', 'server']);
