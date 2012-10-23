var arquivos = require('../arquivos');
var controle = require('../configuracao/controle');	

function GerenciadorDeRequisicao(){
	var controleDeConfiguracao;
	var GerenciadorDeArquivos;
}

GerenciadorDeRequisicao.prototype.configuracao = function(request,response){
	
	GerenciadorDeArquivos = new arquivos();
	controleDeConfiguracao = new controle();
	var conf = request.body;
	
	controleDeConfiguracao.novaConfiguracao(conf.banco['usuario'],conf.banco['senha'],'localhost',conf.banco['nome']);
	
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