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

gulp.task('sass', function () {
	var stream = gulp.src('app/resources/css/styles.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('app/resources/css'));
	return stream;
});

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

gulp.task('watch', function() {
	gulp.watch('app/resources/css/*', ['sass']);
	gulp.watch('app/resources/templates/*.hbs', ['templates']);
});

gulp.task('connect', function() {
	connect.server({
		port: 8080,
		root: 'app'
	});
});

gulp.task('open', ['connect'], function () {
	return opn( 'http://localhost:8080' );
});

gulp.task('clean', function () {
	return del([
		'./dist/**/*'
	]);
});

gulp.task('copy:css', function() {
	var stream = gulp.src('app/resources/css/styles.css')
		.pipe(gulp.dest('dist/resources/css'));
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

gulp.task('serve', ['open', 'templates', 'sass', 'watch']);

gulp.task('build', function(callback) {
	runSequence('clean', 'useref', callback);
});
