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


Banco.prototype.insert = function(sql,funcao,dados){

    this.conexao.query(sql,function(err,result){
    	if(err){
    		console.log(err);
    	}
    	funcao(result.insertId,dados)
    });
    	
    
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
Banco.prototype.select = function(sql,funcao){
	this.conexao.query(sql,function(err,result){
			funcao(result);
	});
}

Banco.prototype.selectResponse = function(sql,response,funcao){
	this.conexao.query(sql,function(response,result){
			funcao(response,result);
	});
}

Banco.prototype.executar = function(sql){
	this.conexao.query(sql);
}

Banco.prototype.encerrar = function (){
	this.conexao.end()	
}
module.exports = Banco;


