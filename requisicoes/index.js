var arquivos = require('../arquivos');
var controle = require('../configuracao/controle');	

function GerenciadorDeRequisicao(){
	this.GerenciadorDeArquivos = new arquivos();
	this.controleDeConfiguracao = new controle();
}

/*Configuração*/


GerenciadorDeRequisicao.prototype.configuracao = function(request,response){
	var html = " <!DOCTYPE html PUBLIC \"-\"http://www.w3.org/TR/html4/strict.dtd\">"
				+
				"<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en\">"
				+
				"<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"
				+
				"<title>Configuração</title>"
				+
				"<meta name=\"author\" content=\"Hermes\" />"
				+
				"</head>"
				+
				"<body>"
				+
				"<form method=\"post\" action=\"/configuracao\">"
				+
				"<h2 class=\"star\"><span>Configuração</span> </h2>"
				+
				"<fieldset>"
				+
				"<legend>Banco de Dados</legend>"
				+				
				"<table>"
				+
				"<tr>"
				+
				"<td>"
				+
				"Nome do banco de dados:"
				+
				"</td>"
				+
				"<td>"
				+
				"<input type=\"text\" name=\"banco[nome]\" />"
				+
				"</td>"
				+
				"</tr>"
				+
				"<tr>"
				+
				"<td>"
				+
				"Usuário:"
				+
				"</td>"
				+
				"<td>"
				+
				"<input type=\"text\" name=\"banco[usuario]\"  />"
				+
				"</td>"
				+
				"</tr>"
				+
				"<tr>"
				+
				"<td>"
				+
				"Senha:"
				+
				"</td>"
				+
				"<td>"
				+
				"<input type=\"password\" name=\"banco[senha]\"  />"
				+
				"</td>"
				+
				"</tr>"
				+
				"<tr>"
				+
				"<td><input type=\"submit\" value=\"Enviar\" /> </td>"
				+
				"<td><input type=\"submit\" value=\"Cancelar\" /> </td>"
				+
				"</tr>"
				+
				"</table>"
				+
				"</fieldset>"
				+
				"</form>"
				+
				"</body>"
				+
				"</html>";
				console.log(html);
	response.write(html);
	response.end();
}

GerenciadorDeRequisicao.prototype.gerenciarConfiguracao = function(request,response){
		
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


/*Formulário*/
GerenciadorDeRequisicao.prototype.formulario = function(request,response){
	console.log('FORMULARIO');
}

module.exports = GerenciadorDeRequisicao;