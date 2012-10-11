var fs = require('fs');

function GerenciadorDeArquivos(){
	var arquivo;
}

GerenciadorDeArquivos.prototype.leArquivo = function(caminho){
	this.arquivo = fs.readFileSync(caminho,'utf-8');
}

GerenciadorDeArquivos.prototype.retornaJSON = function(){
	return JSON.parse(this.arquivo);
}

GerenciadorDeArquivos.prototype.criarArquivo = function(nome,dados){
	
}

GerenciadorDeArquivos.prototype.apagarArquivo = function(nome){
	
}

GerenciadorDeArquivos.prototype.editarArquivo = function(nome,dados){
	
}



module.exports = GerenciadorDeArquivos;






