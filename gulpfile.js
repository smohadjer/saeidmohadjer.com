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

	//linting
	htmlhint = require("gulp-htmlhint"),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	csslint = require('gulp-csslint'),

	//build
	del = require('del'),
	useref = require('gulp-useref'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	npmDist = require('gulp-npm-dist');
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
	var stream = gulp.src('app/resources/scss/styles.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./maps'))
		//.pipe(cssHint())
		.pipe(gulp.dest('.tmp/resources/css'));

	return stream;
});

gulp.task('htmlHint', function() {
	var stream = gulp.src('app/*.html')
		.pipe(htmlhint())
		.pipe(htmlhint.failReporter());
	return stream;
});

gulp.task('cssLint', ['sass'], function() {
	return gulp.src('app/resources/css/styles.css')
		.pipe(csslint())
		.pipe(csslint.reporter())
		//.pipe(csslint.reporter('fail'));
});

gulp.task('jsHint', function() {
	return gulp.src('app/resources/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		.pipe(jshint.reporter('fail'));
});

gulp.task('connect', function() {
	connect.server({
		port: 9000,
		root: ['.tmp', 'app']
	});
});

gulp.task('open', function () {
	return opn( 'http://localhost:9000' );
});

gulp.task('watch', function() {
	gulp.watch('app/resources/css/*.scss', ['sass']);
	gulp.watch('app/resources/css/styles.css', ['cssLint']);
	gulp.watch('app/resources/templates/*.hbs', ['templates']);
	gulp.watch('app/resources/js/*.js', ['jsHint']);
	gulp.watch('app/*.html', ['htmlHint']);
});

// copy package.json dependencies to .tmp
gulp.task('copy:libs', function() {
  gulp.src(npmDist({
		"copyUnminified": true
  }), {base:'./node_modules'})
    .pipe(gulp.dest('.tmp/resources/vendor'));
});

gulp.task('build:dev', ['templates', 'copy:libs', 'sass', 'cssLint', 'htmlHint', 'jsHint'], function() {

});

gulp.task('serve', ['build:dev'], function(callback) {
	runSequence(
		'connect',
		'open',
		'watch', callback);
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

gulp.task('copy:html', function() {
	var stream = gulp.src('app/*.html')
		.pipe(gulp.dest('.tmp'));
	return stream;
});

gulp.task('useref', function() {
	var stream = gulp.src('.tmp/*.html')
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

gulp.task('open:build', function () {
	return opn( 'http://localhost:8080' );
});

gulp.task('build', function(callback) {
	runSequence(
		['clean', 'build:dev'],
		['copy', 'copy:html'],
		['useref'],
		'connect:build',
		'open:build', callback);
});
