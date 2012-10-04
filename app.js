
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , banco = require('./banco')
  , arq = require('./arquivos');

var app = module.exports = express.createServer();

// Configuration
/*Inicialização de módulos importantes*/
var bd = new banco(); //criação do módulo de banco de dados. 
/**/


app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes

app.get('/', routes.index);




app.post('/form', function(request, response){

	var t = JSON.stringify(request.body);
	console.log(t);
    //console.log(request.body.form.name);
    response.end();

});

// Fim Routes

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
