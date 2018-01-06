var gulp = require('gulp'),
	npmDist = require('gulp-npm-dist');

gulp.task('copy', function() {
	var stream = gulp.src('app/_assets/**/*')
		.pipe(gulp.dest('dist/_assets'));
	return stream;
});

gulp.task('copy:html', function() {
	var stream = gulp.src('app/*.html')
		.pipe(gulp.dest('.tmp'));
	return stream;
});

// copy package.json dependencies to .tmp
gulp.task('copy:libs', function() {
  gulp.src(npmDist({
		"copyUnminified": true
  }), {base:'./node_modules'})
    .pipe(gulp.dest('.tmp/resources/vendor'));
});
