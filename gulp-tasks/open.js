var gulp = require('gulp'),
	opn = require('opn');

gulp.task('open', function () {
	return opn( 'http://localhost:9000' );
});

gulp.task('open:build', function () {
	return opn( 'http://localhost:8080' );
});
