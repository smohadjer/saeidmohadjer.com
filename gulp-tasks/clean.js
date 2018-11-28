var gulp = require('gulp'),
	del = require('del');

gulp.task('clean:tmp', function () {
	return del([
		'.tmp/**/*'
	]);
});

gulp.task('clean:dist', function () {
	return del([
		'./dist/**/*'
	]);
});
