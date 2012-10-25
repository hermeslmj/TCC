//cria a variável que contpém o módulo com o modelo da configuração.
var moduloModeloConfiguracao = require("../modelo");


function ControleConfiguracao(){
	
	this.modeloConfiguracao = new moduloModeloConfiguracao();
	
}

ControleConfiguracao.prototype.novaConfiguracao =  function(usuario,senha,host,db){
	
	this.modeloConfiguracao.setUsuario(usuario);
	this.modeloConfiguracao.setSenha(senha);
	this.modeloConfiguracao.setHost(host);
	this.modeloConfiguracao.setBanco(db);
	
	this.modeloConfiguracao.gravarConfiguracao();
}
ControleConfiguracao.prototype.editarConfiguracao =  function(usuario,senha,host,db){
	this.modeloConfiguracao.setUsuario(usuario);
	this.modeloConfiguracao.setSenha(senha);
	this.modeloConfiguracao.setHost(host);
	this.modeloConfiguracao.setBanco(db);
	
	this.modeloConfiguracao.apagarConfiguracao(); 
	
	this.modeloConfiguracao.gravarConfiguracao();
	
	
}
ControleConfiguracao.prototype.apagarConfiguracao =  function(){
	this.modeloConfiguracao.apagarConfiguracao();
}

module.exports = ControleConfiguracao;