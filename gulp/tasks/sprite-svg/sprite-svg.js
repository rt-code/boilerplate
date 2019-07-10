var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite'),
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace');

var config = require('../../config');

gulp.task('sprite:svg', function() {
  return gulp.src(config.src.img + '/icons/*.svg')
    // minify svg
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    // remove all fill, style and stroke declarations in out shapes
    .pipe(cheerio({
      run: function($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    // cheerio plugin create unnecessary string '&gt;', so replace it.
    .pipe(replace('&gt;', '>'))
    // build svg sprite
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: '../../../build/img/sprite.svg',
          render: {
            scss: {

              dest: config.src.sass + '/helpers/_sprite.scss',
              template: config.src.sass + '/helpers/_sprite_template.scss'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest(config.dest.img));
});
gulp.task('sprite:svg:watch', ['sprite:svg']);
