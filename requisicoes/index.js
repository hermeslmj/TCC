var arquivos = require('../arquivos');
var controle = require('../configuracao/controle');	

function GerenciadorDeRequisicao(){
	this.GerenciadorDeArquivos = new arquivos();
	this.controleDeConfiguracao = new controle();
}

GerenciadorDeRequisicao.prototype.configuracao = function(request,response){
	
	
	var conf = request.body;
	
	console.log(conf);
	if(this.GerenciadorDeArquivos.existeArquivo('./arquivos/configuracao.json')){
		this.controleDeConfiguracao.editarConfiguracao(conf.banco['usuario'],conf.banco['senha'],'localhost',conf.banco['nome']);
		console.log('velha');
	}else{
		console.log('nova');
		this.controleDeConfiguracao.novaConfiguracao(conf.banco['usuario'],conf.banco['senha'],'localhost',conf.banco['nome']);	
	}
	
	
	
	
	
	
	
}

GerenciadorDeRequisicao.prototype.formulario = function(request,response){
	console.log('FORMULARIO');
}

module.exports = GerenciadorDeRequisicao;