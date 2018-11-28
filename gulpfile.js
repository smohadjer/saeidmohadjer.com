var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	requireDir = require('require-dir');

// Require all tasks.
requireDir('./gulp-tasks', { recurse: true });

gulp.task('build:dev', function(callback) {
	runSequence(
		'clean:tmp',
		['copy:libs','copy:fonts:tmp'],
		['hbs', 'sass', 'jsHint'],
		'transpile',
		['cssLint'],
		callback);
});

gulp.task('serve', ['build:dev'], function(callback) {
	runSequence(
		'watch', callback);
});

gulp.task('build', ['clean:dist', 'build:dev'], function(callback) {
	runSequence(
		['copy:assets', 'copy:root', 'copy:content', 'copy:img', 'copy:fonts', 'copy:appleIcon'],
		'useref',
		callback);
});
