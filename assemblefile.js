'use strict';

var assemble = require('assemble');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var extname = require('gulp-extname')
var helpers = require('handlebars-helpers')();
var yml = require('js-yaml');
var browserSync = require('browser-sync').create();
var watch = require('base-watch');
var path = require('path');

var app = assemble();
app.use(watch());



app.task('init',function( cb ){
  // pages, layouts, and partials ship with assemble so I only need to point them at the right files
  // using .create() is what was making it not work :s
  app.pages('*.hbs',{cwd: 'pages'});
  app.layouts('*.hbs', {cwd: 'layouts'});
  app.partials('**/*.hbs', {cwd: 'partials'});
  // load all the yml or json files in the data folder as data, namespaced w/ their filename
  app.dataLoader('yml', function(str, fp){
    return yml.safeLoad(str);
  });
  app.data(['**/*.yml','**/*.json'], {cwd:'data', namespace: true});
  // console.log(app.cache.data);
  app.helpers(helpers);
  cb();
});

// the task to actually build the handlebars files into html
app.task('assemble', ['init'], function(){
  return app.toStream('pages')
    .pipe(app.renderFile())
    .on('err', console.error)
    .pipe(extname())
    .pipe(app.dest(path.join(__dirname,'./dist')))
    .pipe(browserSync.stream());
});

app.task('serve',function(){
  browserSync.init({
    port:8080,
    startPath: 'index.html',
    server: {
      baseDir: path.join(__dirname, './dist')
    }
  });
});

// The sass task autoprefixes the resulting CSS before writing it.
app.task('sass', function(){
  return app.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      grid: true
    }))
    .pipe(app.dest(path.join(__dirname,'./dist/css')))
    .pipe(browserSync.stream());
});

app.task('default', ['sass','assemble','serve']);

app.watch(path.join(__dirname,'./pages/**/*.{hbs}'),['assemble']);
app.watch(path.join(__dirname,'./assets/sass/**/*.{scss}'),['sass']);

module.exports = app;
