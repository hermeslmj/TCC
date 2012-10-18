var mysql = require('mysql');

function Banco(){
	
	
	/*Chama o Gerenciador de Arquivos, solicita a leitura do arquivo e pega ele em formato JSON
	gerArq = new GerenciadorDeArquivos();
	gerArq.leArquivo('./arquivos/configuracao.json');
	var arquivo = gerArq.retornaJSON();
	*/
	
	
	var conexao = null;	
	
}


Banco.prototype.conect = function(user,password,host,banco){
	this.conexao = mysql.createClient({
		user: user,
		password: password,
		host: host
	});
	this.conexao.query(
		'USE ' + banco
	);
	
} 


Banco.prototype.insert = function(sql){
    this.conexao.query(
		sql
	);
}

Banco.prototype.update = function(sql){
	
}

Banco.prototype.delete = function(sql){
	
}  


module.exports = Banco;


