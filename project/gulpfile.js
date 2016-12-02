var gulp = require("gulp");
var concat = require("gulp-concat");
var livereload = require("gulp-livereload");
var minifyhtml = require("gulp-minify-html");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var cssmin = require("gulp-uglifycss");
var htmlPath = require("gulp-rewrite-image-path");
var cssurl = require("gulp-rewrite-cssurl");
var special = require('gulp-special-html');
var utf8Convert = require('gulp-utf8-convert');

var src = "src";
var dist = "dist";

var path = {
	s_img : src + "/images/**/*.*",
	d_img : dist + "/images",
	s_sass : src + "/sass/*.scss",
	d_css : dist + "/css",
	s_js : src + "/js/*.js",
	d_js : dist + "/js",
	s_html: src + "/**/*.html",
	d_html: dist + "/"
};

gulp.task("img-min",function() {
	return gulp.src(path.s_img)
				.pipe(imagemin())
				.pipe(gulp.dest(path.d_img));
});

function errFnc(error) {
	console.log(error.toString());
	this.emit('end');
}

gulp.task("compile-sass", function() {
	return gulp.src(path.s_sass)
				.pipe(sass())	
				.on("error",errFnc)
				.pipe(cssmin())
				.pipe(gulp.dest(path.d_css));
});

gulp.task("js-min", function() {
	return gulp.src(path.s_js)
				/*.pipe(uglify())*/
				.pipe(gulp.dest(path.d_js));
});

/*.pipe(minifyhtml())*/
/*.pipe(htmlPath({path:"images"}))*/
/*.pipe(special())*/
gulp.task("html-min",function() {
	return gulp.src(path.s_html)
				.pipe(utf8Convert({
					encNotMatchHandle:function (file) {
						//notify 
					}
				}))
				.pipe(gulp.dest(path.d_html));
});

gulp.task("watch",function() {
	livereload.listen();
	gulp.watch(path.s_img, ["img-min"]);
	gulp.watch(path.s_sass, ["compile-sass"]);
	gulp.watch(path.s_js, ["js-min"]);
	gulp.watch(path.s_html, ["html-min"]);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

gulp.task("default",["html-min","img-min", "watch", "compile-sass","js-min"],function() {
	return console.log("gulp task complete!!");
});