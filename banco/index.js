var mysql = require('mysql');

function Banco(){

	var conexao = null;
	var resultado = null;
	
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

Banco.prototype.update = function(sql){
}
	 this.conexao.query(
		sql
	);
}

Banco.prototype.remove = function(sql){
	 this.conexao.query(
		sql
	);
}




Banco.prototype.select = function(sql){
	console.log('entrei select');
	
	console.log(this.resultado);
	this.conexao.query(sql, function(err,rows){
		for(var i in rows){
			this.resultado +=  rows[i];
		}	
		
	console.log(rows);

	});
	
	
		

	
}

Banco.prototype.retornaResultado = function(){
	console.log('retorna resultado'+this.resultado);
	//return this.resultado;
}


module.exports = Banco;


