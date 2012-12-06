var banco = require('./../../banco');


function ModeloFormulario(){
	var nome;
	var campos;
	 
	
} 

ModeloFormulario.prototype.cb = function(r){
	
	return r;
}

ModeloFormulario.prototype.inserir = function(dados){
	var db = new banco();
	 
	db.conect('root','root','localhost','tcc');
	data_atual = new Date();
	data_atual = data_atual.getFullYear()+'-'+data_atual.getMonth()+'-'+data_atual.getDay();
	sql = 'INSERT INTO formulario(nome,data_criacao) VALUES("'+ dados['name'] +'","'+ data_atual +'")';
	
	//db.insert(sql);
	
	
	
	var marcador,tipo,obrigatorio;
	var sqlcampo,sqlespecifico;
	console.log(dados);	
	
	for(var i in dados){
		 if(dados[i].tipo == undefined){
    	//	console.log('nao eh campo');
    	}else{
    		switch(dados[i].tipo){
    			case 'texto':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var tamanho = dados[i].tamanho;
    				var validacao = dados[i].validacao;
    				
    				sqlcampo = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES(0,0,'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				sqlespecifico = ""
    				console.log("(Campo texto:)"+sql);
    				
    			break;
    			
    			case 'area':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var largura = dados[i].altura; 
    				var altura  = dados[i].largura;
    				var sql = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES(0,0,'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				console.log("(Campo area:)"+sql);
    			break;
    			
    			case 'upload':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var caminho = '/upload';
    				var sql = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES(0,0,'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				console.log("(Campo upload:)"+sql);
    			break;
    			
    			case 'lista':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var opcoes = dados[i].opcoes;
    				var sql = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES(0,0,'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				console.log("(Campo lista:)"+sql);
    			break;
    			
    			case 'marcacao':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var opcoes = dados[i].opcoes;
    				var multipla = dados[i].multipla;
    				var sql = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES(0,0,'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				console.log("(Campo marcacao:)"+sql);
    			break;
    			
    		}
    	}
	}
	
}
ModeloFormulario.prototype.editar = function(nome,campos){
	
}
ModeloFormulario.prototype.apagar = function(nome,campos){
	
}

module.exports = ModeloFormulario;
