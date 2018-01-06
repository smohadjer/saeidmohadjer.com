var gulp = require('gulp'),
	htmlhint = require("gulp-htmlhint");

gulp.task('htmlHint', function() {
	var stream = gulp.src('app/*.html')
		.pipe(htmlhint())
		.pipe(htmlhint.failReporter());
	return stream;
});
