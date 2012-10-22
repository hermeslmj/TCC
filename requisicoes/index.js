var arquivos = require('../arquivos');
var controle = require('../configuracao/controle');	

function GerenciadorDeRequisicao(){
	var controleDeConfiguracao;
	var GerenciadorDeArquivos;
}

GerenciadorDeRequisicao.prototype.configuracao = function(request,response){
	
	GerenciadorDeArquivos = new arquivos();
	controleDeConfiguracao = new controle();
	
	controleDeConfiguracao.novaConfiguracao('a','b','c','d');
	/*console.log(GerenciadorDeArquivos);
	if(GerenciadorDeArquivos.existeArquivo('../arquivos/configuracao.json')){
		console.log('nova config');	
	}else{
		console.log('velha config');
	}*/
	
	
	
}

GerenciadorDeRequisicao.prototype.formulario = function(request,response){
	console.log('FORMULARIO');
}

module.exports = GerenciadorDeRequisicao;