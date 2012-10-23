var moduloArquivos = require('./../../arquivos');
function ModeloConfiguracao(){
	var usuario;
	var senha;
	var banco;
	var host;
	
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
	var GerenciadorDeArquivos = new moduloArquivos();
	var configuracao = "{ \"user\": \""+this.usuario+"\", \"password\": \""+this.senha+"\", \"db\": \""+this.banco+"\",\"host\": \""+this.host+"\" }";
	
	GerenciadorDeArquivos.criarArquivo('configuracao.json',configuracao,'./arquivos');
	
}
ModeloConfiguracao.prototype.editarConfiguracao = function(){
	
}
ModeloConfiguracao.prototype.apagarConfiguracao = function(){
	
}

module.exports = ModeloConfiguracao;
