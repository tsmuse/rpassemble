'use strict';

var assemble = require('assemble');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var app = assemble();

app.task('init',function( cb ){
  app.pages('templates/*.hbs');
  app.create('layouts',{viewType: 'layout'});
  app.create('partials',{viewType: 'partial'});
  app.layouts('./layouts/*.hbs');
  app.partials('./partials/**/*.hbs');

  cb();
});

app.task('assemble',function(){
  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(app.dest('dist'));
});

// The sass task autoprefixes the resulting CSS before writing it.
app.task('sass', function(){
  return app.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      grid: true
    }))
    .pipe(app.dest('./dist/css'));
});

app.task('default', ['init','sass','assemble']);

module.exports = app;
