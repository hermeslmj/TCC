/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , arquivo = require('./arquivos')
  , requisicoes = require('./requisicoes');
  

var app = module.exports = express.createServer();




/*Inicialização de módulos importantes 
var bd = new banco(); //criação do módulo de banco de dados. 
*/
var GerenciadorDeRequisicao = new requisicoes();


// Configuration



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


// REQUISIÇÕES


//Requisições de página via GET

app.get('/', routes.index);

app.get('/configuracao', function(request,response){
	GerenciadorDeRequisicao.configuracao(request,response);
	
});

app.get('/formularios', function(request,response){
	GerenciadorDeRequisicao.formulario(request,response);
});

app.get('/usarform',function(request,response){
	GerenciadorDeRequisicao.usarFormulario(request,response);
});
app.get('/excluirform',function(request,response){
	//GerenciadorDeRequisicao.excluirFormulario(request,response);
});

app.get('/verform',function(request,response){
	GerenciadorDeRequisicao.verDados(request,response);
});


app.get('/excluir',function(request,response){
	GerenciadorDeRequisicao.excluirForm(request,response);
});

app.get('/excluirdado',function(request,response){
	GerenciadorDeRequisicao.excluirdado(request,response);
});
	




//Requisições de página via POST

app.post('/gerenciarconfiguracao', function(request,response){
	GerenciadorDeRequisicao.gerenciarConfiguracao(request,response);
	response.end();
});

app.post('/gerenciarformulario', function(request, response){
	GerenciadorDeRequisicao.gerenciarFormulario(request,response);
});

app.post('/inserirDados',function(request,response){
	GerenciadorDeRequisicao.inserirDados(request,response);
});

// Fim Routes

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});