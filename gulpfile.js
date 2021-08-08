const gulp = require('gulp')
const del = require('del')
const gulpPug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass')); // подключаем sass
const gulpPlumber = require('gulp-plumber') // позволяет серверу работать даже если есть ошибка в файлах
const gulpBabel = require('gulp-babel') // оптимизирует js код для старых браузеров
const gulpUglify = require('gulp-uglify') // добавляет минификацию js файлов
const gulpImagemin = require('gulp-imagemin') // уменьшаем размер изображений
const gulpAutoprefixer = require('gulp-autoprefixer') // добавляет префиксы для старых браузеров
const gulpCleanCss = require('gulp-clean-css') // добавляет минификацию css файлов
const browserSync = require('browser-sync').create() // добавляет минификацию css файлов

function clean() {
    return del('dist');
}

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
        .pipe(gulpCleanCss({level: 2}))
        .pipe(gulpPlumber.stop())
        .pipe(browserSync.stream())
        .pipe(gulp.dest('dist/static/css/'));
}

function script() {
    return gulp.src('dev/static/js/main.js')
        .pipe(gulpBabel({
            presets: ['@babel/env']
        }))
        .pipe(gulpUglify())
        .pipe(browserSync.stream())
        .pipe(gulp.dest('dist/static/js/'));
}

function imageMin() {
    return gulp.src(
        ['dev/static/images/**/*.{jpg,png,gif,svg}'],
        ['!dev/static/images/sprite/*'])
        .pipe(gulpImagemin([
            gulpImagemin.gifsicle({interlaced: true}),
            gulpImagemin.mozjpeg({quality: 75, progressive: true}),
            gulpImagemin.optipng({optimizationLevel: 5}),
            gulpImagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('dist/static/images/'));
}

function watch() {
    browserSync.init({
        server: {
            baseDir:"dist"
        }
    });

    gulp.watch("dev/pug/**/*.pug", pug2html);
    gulp.watch("dev/static/styles/**/*.scss", scss2css);
    gulp.watch("dev/static/images/**/*.{jpg,png,gif,svg}", imageMin);
    gulp.watch("dev/static/js/main.js", script);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
}

exports.default = gulp.series(clean, pug2html, scss2css, imageMin, script, watch);