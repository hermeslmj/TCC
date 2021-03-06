
var moduloModeloFormulario = require("../modelo");

function ControleFormulario(){
	this.modeloFormulario = new moduloModeloFormulario();
}

ControleFormulario.prototype.novoFormulario = function(request,response){

	// Formulário guarda as informações vindas por POST
	formulario = request.body.form;
	this.modeloFormulario.inserir(formulario)
}

ControleFormulario.prototype.usarFormulario = function(request,response){
	this.modeloFormulario.montarFormulario(request,response);	
}

ControleFormulario.prototype.inserirDados = function(request,response){
	var dados  = request.body;
	this.modeloFormulario.inserirDados(dados,response);
}
ControleFormulario.prototype.verDados = function(request,response){
	this.modeloFormulario.verDados(request,response);
}
ControleFormulario.prototype.excluirform = function(request,response){
	this.modeloFormulario.excluirform(request,response);
}
ControleFormulario.prototype.excluirdado = function(request,response){
	this.modeloFormulario.excluirdado(request,response);
}
ControleFormulario.prototype.editarform = function(request,response){
	this.modeloFormulario.editarform(request,response);
}
ControleFormulario.prototype.apagarCampo = function(dados,response){
	this.modeloFormulario.apagarCampo(dados,response);
}
ControleFormulario.prototype.editarCampo = function(dados,response){
	this.modeloFormulario.editarCampo(dados,response);
}
ControleFormulario.prototype.gerenciarEdicaoFormulario = function(request,response){
	this.modeloFormulario.gerenciarEdicaoFormulario(request,response);
}

module.exports = ControleFormulario;

