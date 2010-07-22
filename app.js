var kiwi= require('kiwi');

kiwi.require('express');
require('express/plugins');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

configure(function(){
  use(MethodOverride);
  use(ContentLength);
  use(Logger);
  set('root', __dirname);
});

var articleProvider= new ArticleProvider();

get('/', function(){
  var self = this;
  articleProvider.findAll(function(error, docs){
    self.render('blogs_index.html.haml', {
      locals: {
        title: 'Blog',
        articles: docs
      }
    });
  })
});

get('/*.css', function(file){
  this.render(file + '.css.sass', { layout: false });
});

run();