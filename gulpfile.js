var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    image = require('gulp-image'),
    cleanCSS = require('gulp-clean-css');


gulp.task("image", function() {
  return  gulp.src('img/*')
    .pipe(image())
    .pipe(gulp.dest('dist/img'))
}); 

gulp.task("concatScriptsJs", function() {
 return   gulp.src(['js/jquery.js',
                    'js/fastclick.js',
                    'js/foundation.js',
                    'js/foundation.equalizer.js',          
                    'js/foundation.reveal.js'])
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest("js"));
});

gulp.task("minifyScriptsJs", function() {
 return   gulp.src("js/scripts.js")
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task("concatScriptsCss", function() {
 return   gulp.src(['css/arvo.css',
             'css/photo-grid.css',
             'css/basics.css', 
             'css/footer.css',
             'css/hero.css',
             'css/menu.css',
             'css/modals.css',
             'css/foundation.min.css',
             'css/normalize.css'])
      .pipe(concat("main.css"))
      .pipe(gulp.dest("css"));
});


gulp.task("minify-css", function() {
return   gulp.src("css/main.css")
   .pipe(rename('main.min.css'))
   .pipe(cleanCSS({compatibility: 'ie8'}))
   .pipe(gulp.dest('css'));
});


gulp.task("build", ['image', 'concatScriptsJs', 'minifyScriptsJs', 'concatScriptsCss', 'minify-css'], function() {
    return gulp.src(["img/*", "js/scripts.min.js", "css/main.min.css", 'index.html', ], {base: './'})
    .pipe(gulp.dest('dist'));
    
});



gulp.task("default", ['build'], function() {
   gulp.start('build');
});