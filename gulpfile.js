const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('chunk',function(){
    return  gulp.src('./src/common/js/jquery/jquery-2.0.3.min.js')
            .pipe(plugins.concat('./src/common/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js'))
            .pipe(plugins.concat('./src/common/bootstrap-dist/js/bootstrap.min.js'))
            .pipe(gulp.dest('./dist/'));
});