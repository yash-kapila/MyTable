var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');

var appFiles = ['./app/app.js', './app/scripts', './app/my-table/**/*.js'];

function buildIndexHtml () {
	gulp.src('./app/index-es6.html')
		.pipe(gulp.dest('./build'));
};

function buildVendorFiles () {
	gulp.src('./app/vendor/*.js')
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./build'));
};

function buildAppFiles () {
	gulp.src(['./app/app.js', './app/scripts/*.js', './app/my-table/**/*.js'])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./build'));
};

function importStaticFiles () {

};

function clean () {
	del(['build']);
};

gulp.task('clean', clean);

gulp.task('buildVendorJS', buildVendorFiles);

gulp.task('buildAppJS', buildAppFiles);

gulp.task('build', buildIndexHtml);