var gulp = require('gulp'),
	sass = require('gulp-sass'),
	opn = require('opn'),
	connect = require('gulp-connect');

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch('app/resources/css/*', ['sass']);
});

gulp.task('sass', function () {
	var stream = gulp.src('app/resources/css/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/resources/css'));
	return stream;
});

gulp.task('connect', function() {
  connect.server({
	  port: 8080,
	  root: 'app'
  });
});

gulp.task('open', ['connect'], function () {
    return opn( 'http://localhost:8080' );
});

// serve development templates
gulp.task('serve', ['open', 'sass', 'watch']);
