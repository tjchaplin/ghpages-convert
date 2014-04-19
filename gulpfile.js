var gulp = require('gulp');
var git = require('gulp-git');
var bump = require('gulp-bump');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var gutil = require('gulp-util');

gulp.task('default',['lint','test']);

gulp.task('test',function () {
	gulp.src('test/**/*.js')
		.pipe(mocha({reporter:'spec'}));
});

gulp.task('lint', function() {
  gulp.src(['./lib/**/*.js',
            './test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
	.pipe(jshint.reporter('fail'));
});

gulp.task("bump", function(){
    return gulp.src("./package.json")
                .pipe(bump())
                .pipe(gulp.dest("./"));
});

gulp.task("tag",["bump"] ,function () {
    var version = require("./package.json").version;
    gutil.log('Tagging:'+version);

    gulp.src("./")
        .pipe(git.commit(version));

    git.tag(version, version);
    git.push("origin","master",{args:"--tags"});
});