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
	 res = null;
	db.conect('root','root','localhost','tcc');
	data_atual = new Date();
	data_atual = data_atual.getFullYear()+'-'+data_atual.getMonth()+'-'+data_atual.getDay();
	sql = 'INSERT INTO formulario(nome,data_criacao) VALUES("'+ dados['name'] +'","'+ data_atual +'")';
	
	//db.insert(sql);
	
	db.select('SELECT MAX(id) as id from formulario',function(r){
		
		console.log(r[0].id);
		
	});
	
	
	
	
	
	var marcador,tipo,obrigatorio;
		
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
    				
    				//var sql = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES()"
    				
    			break;
    			
    			case 'area':
    			break;
    			
    			case 'upload':
    			break;
    			
    			case 'lista':
    			break;
    			
    			case 'marcacao':
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
