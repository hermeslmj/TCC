var moduloArquivos = require('./../../arquivos');
function ModeloConfiguracao(){
	var usuario;
	var senha;
	var banco;
	var host;
	
	this.GerenciadorDeArquivos = new moduloArquivos();
	
}

ModeloConfiguracao.prototype.setUsuario = function(usuario){
	this.usuario = usuario;
}
ModeloConfiguracao.prototype.setSenha = function(senha){
	this.senha = senha;
}
ModeloConfiguracao.prototype.setBanco = function(banco){
	this.banco = banco;
}
ModeloConfiguracao.prototype.setHost = function(host){
	this.host = host;
}
ModeloConfiguracao.prototype.getUsuario = function(){
	return this.usuario;
}
ModeloConfiguracao.prototype.getSenha = function(){
	return this.senha;
}
ModeloConfiguracao.prototype.getBanco = function(){
	return this.banco;
}
ModeloConfiguracao.prototype.getHost = function(){
	return this.host;
}
ModeloConfiguracao.prototype.gravarConfiguracao = function(){
	
	var configuracao;
	
	configuracao = "{ \"user\": \""+this.usuario+"\", \"password\": \""+this.senha+"\", \"db\": \""+this.banco+"\",\"host\": \""+this.host+"\" }";
	
	this.GerenciadorDeArquivos.criarArquivo('configuracao.json',configuracao,'./arquivos');
	
}

ModeloConfiguracao.prototype.apagarConfiguracao = function(){
	
	this.GerenciadorDeArquivos.apagarArquivo('configuracao.json','./arquivos');
}

ModeloConfiguracao.prototype.carregarConfiguracao = function(){
	var dados;
	this.GerenciadorDeArquivos.leArquivo('./arquivos/configuracao.json');
	dados = this.GerenciadorDeArquivos.retornaJSON();
	
	this.setHost(dados.host);
	this.setSenha(dados.password);
	this.setUsuario(dados.user);
	this.setBanco(dados.db);
}

module.exports = ModeloConfiguracao;
