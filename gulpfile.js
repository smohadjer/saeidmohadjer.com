var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	requireDir = require('require-dir');

// Require all tasks.
requireDir('./gulp-tasks', { recurse: true });

gulp.task('build:dev', ['templates', 'copy:libs', 'sass', 'cssLint', 'htmlHint', 'jsHint'], function() {

});

gulp.task('build', function(callback) {
	runSequence(
		['clean', 'build:dev'],
		['copy', 'copy:html'],
		['useref'],
		'connect:build',
		'open:build', callback);
});

gulp.task('serve', ['build:dev'], function(callback) {
	runSequence(
		'connect',
		'open',
		'watch', callback);
});
