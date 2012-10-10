var mysql = require('mysql');
var GerenciadorDeArquivos = require('../arquivos');
function Banco(){
	
	
	/*Chama o Gerenciador de Arquivos, solicita a leitura do arquivo e pega ele em formato JSON*/
	gerArq = new GerenciadorDeArquivos();
	gerArq.leArquivo('./arquivos/configuracao.json');
	var arquivo = gerArq.retornaJSON();
	/**/
	
	
	var conexao = null;	
	this.conexao = mysql.createClient({
		user: arquivo.user,
		password: arquivo.password,
		host: arquivo.host
	});
	this.conexao.query(
		'USE ' + arquivo.db
	);
}

Banco.prototype.insert = function(sql){
    this.conexao.query(
		sql
	);
}

Banco.prototype.edit = function(sql){
	
}

Banco.prototype.remove = function(sql){
	
}  


module.exports = Banco;


