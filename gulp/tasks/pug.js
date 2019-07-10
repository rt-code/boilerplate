var gulp = require('gulp'),
  pug = require('gulp-pug'),
  changed = require('gulp-changed'),
  gulpif = require('gulp-if'),
  frontMatter = require('gulp-front-matter'),
  plumber = require('gulp-plumber'),
  prettify = require('gulp-prettify'),
  config = require('../config');

//pug compile
function renderHtml(onlyChanged) {
  return gulp
    .src([config.src.templates + '/[^_]*.pug'])
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(gulpif(onlyChanged, changed(config.dest.html, {
      extension: '.html'
    })))
    .pipe(frontMatter({
      property: 'data'
    }))
    .pipe(pug())
    .pipe(prettify({
      indent_size: 2,
      wrap_attributes: 'auto', // 'force'
      preserve_newlines: true,
      // unformatted: [],
      end_with_newline: true
    }))
    .pipe(gulp.dest(config.dest.html));
}

gulp.task('pug', function () {
  return renderHtml();
});
gulp.task('pug:changed', function () {
  return renderHtml(true);
});


gulp.task('pug:watch', function () {
  gulp.watch([config.src.templates + '/**/_*.pug'], ['pug']);
  gulp.watch([config.src.templates + '/**/[^_]*.pug'], ['pug:changed']);
});
