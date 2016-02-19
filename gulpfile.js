var gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		browserSync  = require('browser-sync').create(),
		jade         = require('gulp-jade'),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglifyjs');

gulp.task('browser-sync', ['styles', 'scripts', 'jade'], function() {
		browserSync.init({
				server: {
						baseDir: "./"
				},
				notify: false
		});
		
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.stream());
});

gulp.task('jade', function() {
	return gulp.src('*.jade')
	.pipe(jade())
	.pipe(gulp.dest('dist'));
});

gulp.task('scripts', function() {
	return gulp.src([
		'./bower_components/jquery/jquery-1.11.2.min.js',
		])
		.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('*.jade', ['jade']).on('change', browserSync.reload);
	gulp.watch('dist/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);