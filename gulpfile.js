var gulp = require('gulp'),
	//sass support
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),

	//local server
	opn = require('opn'),
	connect = require('gulp-connect'),

	//precompiling handlebars templates
	handlebars = require('gulp-handlebars'),
	wrap = require('gulp-wrap'),
	declare = require('gulp-declare'),
	concat = require('gulp-concat'),

	//build
	//copy = require('gulp-copy'),
	del = require('del'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	runSequence = require('run-sequence');

gulp.task('templates', function() {
	gulp.src('app/resources/templates/*.hbs')
		.pipe(handlebars({
			handlebars: require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace: 'MyApp.templates',
			noRedeclare: true, // Avoid duplicate declarations
		}))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('app/resources/templates/'));
});

gulp.task('sass', function () {
	var stream = gulp.src('app/resources/css/styles.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('app/resources/css'));
	return stream;
});

gulp.task('connect', function() {
	connect.server({
		port: 8080,
		root: 'app'
	});
});

gulp.task('open', function () {
	return opn( 'http://localhost:8080' );
});

gulp.task('watch', function() {
	gulp.watch('app/resources/css/*', ['sass']);
	gulp.watch('app/resources/templates/*.hbs', ['templates']);
});

gulp.task('serve', function(callback) {
	runSequence(['templates', 'sass'], 'connect', 'open', 'watch', callback);
});

/**************** build tasks *****************/
gulp.task('clean', function () {
	return del([
		'./dist/**/*'
	]);
});

gulp.task('copy', function() {
	var stream = gulp.src('app/_assets/**/*')
		.pipe(gulp.dest('dist/_assets'));
	return stream;
});

gulp.task('useref', function() {
	var stream = gulp.src('app/*.html')
		//.pipe(debug({title: 'unicorn:'}))
		.pipe(useref())
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', cssnano()))
		.pipe(gulp.dest('dist'));

	return stream;
});

gulp.task('connect:build', function() {
	connect.server({
		port: 8080,
		root: 'dist'
	});
});

gulp.task('build', function(callback) {
	runSequence('clean', ['copy', 'useref'], 'connect:build', 'open', callback);
});
