'use strict';

var assemble = require('assemble');
var app = assemble();

// app.layouts('/layouts/*.hbs');

app.task('init',function( cb ){
  app.pages('templates/*.hbs');
  app.create('layouts',{viewType: 'layout'});
  app.layouts('./layouts/*.hbs');

  cb();
});

app.task('assemble',function(){
  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(app.dest('dist'));
});
app.task('default', ['init','assemble']);

module.exports = app;
