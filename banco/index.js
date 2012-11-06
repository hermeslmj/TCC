var mysql = require('mysql');

function Banco(){

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
	 this.conexao.query(
		sql
	);
}

Banco.prototype.remove = function(sql){
	 this.conexao.query(
		sql
	);
}  


module.exports = Banco;


