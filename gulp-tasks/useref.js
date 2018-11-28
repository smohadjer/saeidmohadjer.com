var gulp = require('gulp'),
	debug = require('gulp-debug'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano');

gulp.task('useref', function() {
	var stream = gulp.src(['app/include/*.html', 'app/include/*.php'])
		.pipe(useref())
		.pipe(debug({title: 'useref:'}))
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssnano()))
		.pipe(gulpif('**/*.js', gulp.dest('dist')))
		.pipe(gulpif('**/*.css', gulp.dest('dist')))
		.pipe(gulpif('**/*.html', gulp.dest('dist/include')))
		.pipe(gulpif('**/*.php', gulp.dest('dist/include')));
	return stream;
});
