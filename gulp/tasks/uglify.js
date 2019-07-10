var gulp = require('gulp'),
  config = require('../config'),
  uglify = require('gulp-uglify'),
  pump = require('pump');

gulp.task('uglify', function () {
  pump([
      gulp.src([config.dest.js + '/*.js']),
      uglify(),
      gulp.dest(config.dest.js)
    ]

  );
});
