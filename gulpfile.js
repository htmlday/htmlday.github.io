var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer")
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("default", function() {
    gulp.watch(['*.html'],['html']);
	gulp.watch(['./scss/*.scss'],['sass']);
	gulp.watch(['./css/*.css'],['html']);
});

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('html',function(){
  gulp.src('./*.html')
    .pipe(plumber())
    .pipe(gulp.dest("./*.html"))
    .pipe(browser.reload({stream:true}))
});

gulp.task("js", function() {
    gulp.src(["./js/*.js","!./js/min/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./js/min"))
        .pipe(browser.reload({stream:true}))
});

gulp.task("sass", function() {
    gulp.src("./scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', "ie 9"],
            cascade: false
        }))
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}))
});
 
gulp.task("default",['server'], function() {
    gulp.watch(["./js/*.js","!./js/min/*.js"],["js"]);
    gulp.watch(['./scss/*.scss'],['sass']);
});