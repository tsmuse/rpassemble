'use strict';

var assemble = require('assemble');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var extname = require('gulp-extname')
var helpers = require('handlebars-helpers')();
var app = assemble();



app.task('init',function( cb ){
  // pages, layouts, and partials ship with assemble so I only need to point them at the right files
  // using .create() is what was making it not work :s
  app.pages('*.hbs',{cwd: 'templates'});
  app.layouts('*.hbs', {cwd: 'layouts'});
  app.partials('**/*.hbs', {cwd: 'partials'});
  app.helpers(helpers);
  cb();
});

app.task('assemble',function(){
  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(extname())
    .pipe(app.dest('dist/'));
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
