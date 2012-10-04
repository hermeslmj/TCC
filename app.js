
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

	
	var formulario;
	var sql;	
	
	
	
	// Formulário guarda as informações vindas por POST
	
	formulario = request.body.form;
	
	console.log(request.body.form);
	//data_atual = new Date();
	//data_atual = data_atual.getFullYear()+'-'+data_atual.getMonth()+'-'+data_atual.getDay();
	//sql = INSERT INTO
	    
    
/*    for(var i in request.body.form){
		
			console.log(request.body.form[i].marcador);
			if(formulario[i].marcador ==  undefined){
				console.log('nao tem marcador');
			}
			
			
		
		
		
	}*/
    response.end();

});

// Fim Routes

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
