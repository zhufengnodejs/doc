var gulp = require('gulp'),
    jshint = require("gulp-jshint");

gulp.task('default', function () {
    gulp.src('*.js')
        .pipe(jshint()) //进行代码检查
        .pipe(jshint.reporter()); // 输出检查结果
});