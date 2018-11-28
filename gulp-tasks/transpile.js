var gulp = require('gulp'),
	babel = require('gulp-babel');

gulp.task('transpile', function () {
	var stream = gulp.src('app/resources/js/*.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('.tmp/resources/js'));

	return stream;
});
