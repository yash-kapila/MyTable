var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var templateCache = require('gulp-angular-templateCache');

var vendorJSFiles = ['./app/vendor/angular.js', './app/vendor/jquery.js', './app/vendor/bootstrap.js'];
var appJSFiles = ['./app/app.js', './app/scripts/*.js', './app/my-table/**/*.js'];
var appCSSFiles = ['./app/styles/*.css', './app/my-table/**/*.css'];

function buildIndexHtml () {
	return gulp.src('./app/index.html')
		.pipe(gulp.dest('./build'));
};

function buildVendorCSS () {
	return gulp.src('./app/vendor/*.css')
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('./build'));
}

function buildVendorJS () {
	return gulp.src(vendorJSFiles)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./build'));
};

function buildAppCSS () {
	return gulp.src(appCSSFiles)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest('./build'));
};

function buildAppJS () {
	return gulp.src(appJSFiles)
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./build'));
};

function importStaticFiles () {
	return gulp.src('./app/fonts/*')
		.pipe(gulp.dest('./build/fonts'));
};

function importJSON () {
	return gulp.src('./app/data/*')
		.pipe(gulp.dest('./build/data'));
};

function bundleTemplates () {
	return gulp.src('./app/my-table/**/*.html')
    	.pipe(templateCache('template.js', {module: 'myTableApp'}))
    	.pipe(gulp.dest('./build'));
};

function clean () {
	return del(['build']);
};

gulp.task('clean', clean);

gulp.task('importJSON', importJSON);

gulp.task('importStaticFiles', importStaticFiles);

gulp.task('buildVendorJS', buildVendorJS);

gulp.task('buildAppJS', buildAppJS);

gulp.task('buildVendorCSS', buildVendorCSS);

gulp.task('buildAppCSS', buildAppCSS);

gulp.task('buildIndexHtml', buildIndexHtml);

gulp.task('bundleTemplates', bundleTemplates);

/**
*	Sequential execution of tasks using run-sequence plugin
*	'clean' executed first followed by 'buildJS/CSS' files which execute in parallel
*	and indexHTML at the end.
**/
gulp.task('build', function () {
  	runSequence('clean',
  		'bundleTemplates',
  		['buildVendorJS', 'buildAppJS', 'buildVendorCSS', 'buildAppCSS'],
  		['importJSON', 'importStaticFiles'], 
  		'buildIndexHtml');
});

gulp.task('watch', function () {
	gulp.watch('./app/**/**/*.*', ['build']);
});

gulp.task('default', ['build']);