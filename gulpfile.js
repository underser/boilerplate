var gulp         = require('gulp'),
    newer        = require('gulp-newer'),
    imagemin     = require('gulp-imagemin'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jade         = require('gulp-jade'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    spritesmith  = require('gulp.spritesmith'),
    browserSync  = require('browser-sync').create();

gulp.task("serve", ["sass", "templates"], function() {
    browserSync.init({
        server: "./dist"
    });

    gulp.watch("jade/*.jade", ["templates"]);
    gulp.watch("jade/jade-includes/*.jade", ["templates"]);
    gulp.watch("sass/*.sass", ["sass"]);
    gulp.watch("sass/sass-includes/*.sass", ["sass"]);
    gulp.watch("dist/js/*.js").on('change', browserSync.reload);
});

gulp.task("templates", function() {
    var YOUR_LOCALS = {};

    gulp.src('jade/*.jade')
        .pipe(newer('jade/*.jade'))
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task("sass", function() {
    return gulp.src("sass/*.sass")
        .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}))
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
