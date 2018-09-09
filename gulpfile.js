const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

//sass to css
gulp.task('sass', () => {
    return gulp.src([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ])
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
})

//create js files
gulp.task('js', () => {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/und/popper.min.js'
    ])
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream())
});

//server
gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: './src'
    });

    gulp.watch([
        'node_modules/bootstrap/scss/bootstrap.scss',
        'src/scss/*.scss'
    ], ['sass']);

    gulp.watch('src/*.html').on('change', browserSync.reload)
})

//copy font-awsome
gulp.task('font-awsome', () => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/css'))
})

gulp.task('fonts', () => {
    return gulp.src('node_modules/font-awesome/fonts/*.')
    .pipe(gulp.dest('src/fonts'))
})

gulp.task('default', ['js', 'serve', 'font-awsome', 'fonts' ])