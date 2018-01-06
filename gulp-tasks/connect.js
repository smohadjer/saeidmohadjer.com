var gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		port: 9000,
		root: ['.tmp', 'app']
	});
});

gulp.task('connect:build', function() {
	connect.server({
		port: 8080,
		root: 'dist'
	});
});
