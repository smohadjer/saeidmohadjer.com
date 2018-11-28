var gulp = require('gulp'),
	npmDist = require('gulp-npm-dist');

gulp.task('copy:assets', function() {
	var stream = gulp.src('app/_assets/**/*')
		.pipe(gulp.dest('dist/_assets'));
	return stream;
});

gulp.task('copy:content', function() {
	var stream = gulp.src('app/content/**/*')
		.pipe(gulp.dest('dist/content'));
	return stream;
});

gulp.task('copy:root', function() {
	var stream = gulp.src(['app/*.php', 'app/.htaccess'])
		.pipe(gulp.dest('dist'));
	return stream;
});

gulp.task('copy:appleIcon', function() {
	var stream = gulp.src('app/*.png')
		.pipe(gulp.dest('dist'));
	return stream;
});

gulp.task('copy:img', function() {
	var stream = gulp.src('app/resources/img/**/*')
		.pipe(gulp.dest('dist/resources/img'));
	return stream;
});

gulp.task('copy:fonts:tmp', function() {
	var stream = gulp.src('app/resources/fonts/**/*')
		.pipe(gulp.dest('.tmp/resources/fonts'));
	return stream;
});

gulp.task('copy:fonts', function() {
	var stream = gulp.src('app/resources/fonts/**/*')
		.pipe(gulp.dest('dist/resources/fonts'));
	return stream;
});

// copy package.json dependencies to .tmp
gulp.task('copy:libs', function() {
	var stream = gulp.src(npmDist({
  		"copyUnminified": true
    }), {base:'./node_modules'})
		.pipe(gulp.dest('.tmp/resources/vendor'));
	return stream;
});
