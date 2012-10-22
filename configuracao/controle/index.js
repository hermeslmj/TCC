//cria a variável que contpém o módulo com o modelo da configuração.
var moduloModeloConfiguracao = require("../modelo");


function ControleConfiguracao(){
	var modeloConfiguracao;
	
	
}

ControleConfiguracao.prototype.novaConfiguracao =  function(usuario,senha,host,db){
	modeloConfiguracao = new moduloModeloConfiguracao();
	modeloConfiguracao.setUsuario(usuario);
	modeloConfiguracao.setSenha(senha);
	modeloConfiguracao.setHost(host);
	modeloConfiguracao.setBanco(db);
	//console.log(modeloConfiguracao.getUsuario());
	//modeloConfiguracao.gravarConfiguracao();
	
	modeloConfiguracao.gravarConfiguracao();
}
ControleConfiguracao.prototype.editarConfiguracao =  function(){
	
}
ControleConfiguracao.prototype.apagarConfiguracao =  function(){
	
}

module.exports = ControleConfiguracao;