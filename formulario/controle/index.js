
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

module.exports = ControleFormulario;

