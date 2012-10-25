var fs = require('fs');
var path = require('path');

function GerenciadorDeArquivos(){
	var arquivo;
}

GerenciadorDeArquivos.prototype.leArquivo = function(caminho){
	this.arquivo = fs.readFileSync(caminho,'utf-8');
}

GerenciadorDeArquivos.prototype.retornaJSON = function(){
	return JSON.parse(this.arquivo);
}

GerenciadorDeArquivos.prototype.criarArquivo = function(nome,dados,caminho){
	fs.writeFile(caminho+'/'+nome, dados , function (err) {
  		if (err) return console.log(err);
  		console.log('Arquivo criado com sucesso.');
	});
}

GerenciadorDeArquivos.prototype.apagarArquivo = function(nome,caminho){
	fs.unlinkSync(caminho+'/'+nome);
}

GerenciadorDeArquivos.prototype.editarArquivo = function(nome,dados,caminho){
	
}

GerenciadorDeArquivos.prototype.existeArquivo = function(caminho){
	return path.existsSync(caminho);
}



module.exports = GerenciadorDeArquivos;






