var mysql = require('mysql');
var arq = require('../arquivos');
var conexao = null;
function Banco(){
	var file = arq.learquivo('./arquivos/configuracao.json'); 
	var arquivo = JSON.parse(file);
	
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

module.exports = Banco;

/*

exports.conecta = function(servidor,database,usuario,senha){
	conexao = mysql.createClient ({
		user: usuario,
		password: senha,
		host: servidor
	});
	conexao.query(
		'USE ' + database
	);
}

exports.insert = function(sql){
	conexao.query(
		sql
	);
}
*/

