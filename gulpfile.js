var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require("gulp-concat");
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var browserSync = require("browser-sync");
var cmq = require("gulp-combine-mq");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");



// Pug
gulp.task('pug', function() {
    gulp.src(['./src/**/*.pug', '!./src/**/_*.pug'])
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./docs'));
});

// SASS
gulp.task('sass', function() {
    gulp.src(['./src/styles/**/*.scss', '!./src/styles/**/_*.scss','!./src/styles/lib'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4','ios_saf >= 8'],
            cascade: false
        }))
        .pipe(cmq({ beautify: false }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest('./docs/styles'));
    gulp.src('./src/styles/lib/**')
        .pipe(gulp.dest('./docs/styles/lib'));
});

//Js
gulp.task('js', function() {
    gulp.src(['./node_modules/jquery/docs/jquery.js','./src/scripts/**/*.js','!./src/scripts/lib'])
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./docs/scripts'));
    gulp.src('./src/scripts/lib/**')
        .pipe(gulp.dest('./docs/scripts/lib'));
});

//img
gulp.task('img', function() {
    gulp.src('./src/images/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('./docs/images'));
});

//reload
gulp.task('reload', function() {
    browserSync.reload();
});


gulp.task('default',['pug','sass','js','img'],function(){
    browserSync.init({ server: "./docs" });
    gulp.watch('./src/**/*.pug', ['pug']);
    gulp.watch('./src/styles/**/*.scss', ['sass']);
    gulp.watch('./src/scripts/**/*.js',['js']);
    gulp.watch('./src/images/**/*',['img']);
    gulp.watch('./src/**',['reload']); //Atomでリロードさせるならいらないかも
});
