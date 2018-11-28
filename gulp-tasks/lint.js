var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	csslint = require('gulp-csslint');

gulp.task('cssLint', function() {
	return gulp.src('.tmp/resources/css/styles.css')
		.pipe(csslint())
		.pipe(csslint.reporter())
		//.pipe(csslint.reporter('fail'));
});

gulp.task('jsHint', function() {
	return gulp.src('app/resources/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});
