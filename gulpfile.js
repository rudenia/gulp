const gulp = require('gulp')
const gulpPug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass')); // подключаем sass
const gulpPlumber = require('gulp-plumber') // позволяет серверу работать даже если есть ошибка в файлах
const gulpAutoprefixer = require('gulp-autoprefixer') // добавляет префиксы для старых браузеров
const gulpCleanCss = require('gulp-clean-css') // добавляет минификацию css файлов


function pug2html() {
    return gulp.src('dev/pug/pages/*.pug')
        .pipe(gulpPlumber())
        .pipe(gulpPug({
            pretty: true
        }))
        .pipe(gulpPlumber.stop())
        .pipe(gulp.dest('dist'));
}

function scss2css() {
    return gulp.src('dev/static/styles/styles.scss')
        .pipe(gulpPlumber())
        .pipe(sass())
        .pipe(gulpAutoprefixer())
        .pipe(gulpCleanCss())
        .pipe(gulpPlumber.stop())
        .pipe(gulp.dest('dist/static/css/'));
}

exports.default = gulp.series(pug2html, scss2css);