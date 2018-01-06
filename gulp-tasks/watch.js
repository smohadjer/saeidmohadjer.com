var gulp = require('gulp');

gulp.task('watch', function() {
	gulp.watch('app/resources/scss/*.scss', ['sass']);
	gulp.watch('.tmp/resources/css/styles.css', ['cssLint']);
	gulp.watch('app/resources/templates/*.hbs', ['templates']);
	gulp.watch('app/resources/js/*.js', ['jsHint']);
	gulp.watch('app/*.html', ['htmlHint']);
});
