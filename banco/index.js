var mysql = require('mysql');
var self = this;
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
	
 	resultado = 0;
	
	return this.conexao.query(sql,function(err,fields,result){
		//
		 resultado =  (cb(fields)).id;
	
		
			
	})	
	//console.log(resultado);


	
	
	
		

	
}

Banco.prototype.retornaResultado = function(){
	console.log('retorna resultado'+this.resultado);
	//return this.resultado;
}


module.exports = Banco;


