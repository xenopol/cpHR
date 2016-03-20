var gulp = require('gulp'),
		watch = require('gulp-watch'),
		postcss = require('gulp-postcss'),
		cssnano = require('cssnano'),
		autoprefixer = require('autoprefixer'),
		precss = require('precss'),
		sourcemap = require('gulp-sourcemaps'),
		uglify = require('gulp-uglify'),
		plumber = require('gulp-plumber'),
		browserSync = require('browser-sync').create(),
		browserify = require('gulp-browserify');

var path = {
	html: 'src/**/*.html',
	img: 'src/img/*',
	css: 'src/css/style.css',
	allCss: 'src/css/*.css',
	js: 'src/js/*.js',
	php: 'src/php/**/*',
	dest: 'builds/'
}

gulp.task('html', function(){
	gulp.src(path.html)
		.pipe(watch(path.html))
		.pipe(plumber())
		.pipe(gulp.dest(path.dest))
		.pipe(browserSync.stream());
});

gulp.task('img', function(){
	gulp.src(path.img)
		.pipe(watch(path.img))
		.pipe(plumber())
		.pipe(gulp.dest(path.dest + 'img/'))
		.pipe(browserSync.stream());
});

gulp.task('css', function(){
	gulp.src(path.css)
		.pipe(watch(path.css))
		//.pipe(sourcemap.init())
		.pipe(plumber())
		.pipe(postcss([
			precss(),
			autoprefixer({ browsers: ['last 2 versions'] }),
			cssnano()
		]))
		//.pipe(sourcemap.write())
		.pipe(gulp.dest(path.dest + 'css/'))
		.pipe(browserSync.stream());
});

gulp.task('js', function(){
	gulp.src(path.js)
		.pipe(watch(path.js))
		.pipe(plumber())
		.pipe(browserify({
			insertGlobals : true
		}))
		.pipe(uglify())
		.pipe(gulp.dest(path.dest + 'js/'))
		.pipe(browserSync.stream());
});

gulp.task('php', function(){
	gulp.src(path.php)
		.pipe(watch(path.php))
		.pipe(plumber())
		.pipe(gulp.dest(path.dest+'php/'))
		.pipe(browserSync.stream());
});

gulp.task('serve', ['html', 'img', 'css', 'js', 'php'], function(){
	browserSync.init({
		server: path.dest,
		notify: {styles: {top: 'auto', bottom: '0'} }
	});
	gulp.watch(path.html, ['html']);
	gulp.watch(path.img, ['img']);
	gulp.watch(path.allCss, ['css']);
	gulp.watch(path.js, ['js']);
	gulp.watch(path.php, ['php']);
});

gulp.task('default', ['serve']);