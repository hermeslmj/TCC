
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

module.exports = ControleFormulario;

