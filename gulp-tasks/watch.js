var gulp = require('gulp');

gulp.task('watch', function() {
	gulp.watch('app/resources/css/**/*.scss', ['sass']);
	gulp.watch('app/resources/hbs/*.hbs', ['hbs']);
	gulp.watch('app/resources/js/*.js', ['jsHint', 'transpile']);
	gulp.watch('.tmp/resources/css/*.css', ['cssLint']);
});
