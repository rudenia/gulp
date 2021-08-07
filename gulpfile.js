const gulp = require('gulp')
const gulpPug = require('gulp-pug')
const gulpPlumber = require('gulp-plumber') // позволяет серверу работать даже если есть ошибка в файлах

function pug2html() {
    return gulp.src('dev/pug/pages/*.pug')
        .pipe(gulpPlumber())
        .pipe(gulpPug({
            pretty: true
        }))
        .pipe(gulpPlumber.stop())
        .pipe(gulp.dest('dist'));
}

exports.default = gulp.series(pug2html);