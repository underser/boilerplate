var gulp         = require('gulp'),
    fs           = require('fs'),
    newer        = require('gulp-newer'),
    imagemin     = require('gulp-imagemin'),
    less         = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    hbs          = require('gulp-compile-handlebars'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    spritesmith  = require('gulp.spritesmith'),
    rename       = require('gulp-rename'),
    browserSync  = require('browser-sync').create();

gulp.task("serve", ["less", "templates"], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("pages/*.hbs", ["templates"]);
    gulp.watch("pages/partials/includes/*.hbs", ["templates"]);
    gulp.watch("less/*.less", ["less"]);
    gulp.watch("less/includes/*.less", ["less"]);
    gulp.watch("dist/js/*.js").on('change', browserSync.reload);
});

gulp.task("templates", function() {
  gulp.src('pages/*.hbs')
      .pipe(newer('pages/*.hbs'))
      .pipe(hbs({
          data: {} // There you can provide some data to templates
      }, {
          ignorePartials: true,
          batch: ['pages/partials/includes'],
          helpers : {
              ifCond: function(a, b, opts) {
                  if (a == b) {
                      return opts.fn(this);
                  } else {
                      return opts.inverse(this);
                  }
              }
          }
      }))
      .pipe(rename({
          extname: '.html'
      }))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
});

// Compile less
gulp.task("less", function() {
    return gulp.src("less/*.less")
        .pipe(less())
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task("lib", function() {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        ])
        .pipe(concat("libs.min.js"))
        .pipe(uglify()) // Minify libs.js
        .pipe(gulp.dest("dist/js/"));
});

gulp.task("images", function() {
    return gulp.src('images/**')
              .pipe(newer('dist/images'))
              .pipe(imagemin())
              .pipe(gulp.dest('dist/images'));
});

gulp.task("sprite", function () {
    var spriteData = gulp.src('images/sprite/*.png').pipe(spritesmith({
        algorithm: 'top-down',
        imgName: 'sprite.png',
        cssName: 'sprite.css'
    }));

    return spriteData.pipe(gulp.dest('dist/images/sprite/'));
});

gulp.task("default", ["serve"]);
