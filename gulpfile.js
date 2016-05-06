var gulp = require('gulp'),
	//for sass support
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),

	//for local server
	opn = require('opn'),
	connect = require('gulp-connect'),

	//for precompiling handlebars templates
	handlebars = require('gulp-handlebars'),
	wrap = require('gulp-wrap'),
	declare = require('gulp-declare'),
	concat = require('gulp-concat');

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

gulp.task('serve', ['open', 'templates', 'sass', 'watch']);
