var gulp = require('gulp');
var sass = require('gulp-sass');

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

// serve development templates
gulp.task('serve', ['sass', 'watch']);
