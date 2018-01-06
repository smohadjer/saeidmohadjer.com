var gulp = require('gulp'),
	csslint = require('gulp-csslint');

gulp.task('cssLint', ['sass'], function() {
	return gulp.src('.tmp/resources/css/styles.css')
		.pipe(csslint())
		.pipe(csslint.reporter())
		//.pipe(csslint.reporter('fail'));
});
