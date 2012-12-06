var mysql = require('mysql');
var self = this;
function Banco(){
	var conexao = null;
}


Banco.prototype.conect = function(user,password,host,banco){
	this.conexao = mysql.createConnection({
		user: user,
		password: password,
		host: host,
		database: banco
	});
	
	/*this.conexao.query(
		'USE ' + banco
	);*/
	this.conexao.connect(function(err){
		if(err){
			console.log('Algo deu errado:'+err);
		}
	})
	
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
Banco.prototype.select = function(sql,cb){
	this.conexao.query(sql,function(err,results){
		cb(results);
	});
		
	
	 	
	
}

Banco.prototype.retornaResultado = function(){
	console.log('retorna resultado'+this.res);
	//return this.resultado;
}


module.exports = Banco;


