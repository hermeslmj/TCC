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


module.exports = GerenciadorDeArquivos;






