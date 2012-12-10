var banco = require('./../../banco');
var configuracao = require('./../../configuracao/controle/');

function ModeloFormulario(){
	var nome;
	var campos;
	this.db = new banco();
	this.config = new configuracao();
		
} 
ModeloFormulario.prototype.inserir = function(dados){
	var c = this.config.retornaConfiguracao();	
	this.db.conect(c.user,c.password,c.host,c.db);  
	//db.conect('root','root','localhost','tcc');
	data_atual = new Date();
	data_atual = data_atual.getFullYear()+'-'+data_atual.getMonth()+'-'+data_atual.getDay();
	sql = 'INSERT INTO formulario(nome,data_criacao) VALUES("'+ dados['name'] +'","'+ data_atual +'")';
	
	this.db.insert(sql,inserirCampos,dados);
	
	
	
	
	//console.log(dados);	
	

	
}
ModeloFormulario.prototype.editar = function(nome,campos){
	
}
ModeloFormulario.prototype.apagar = function(nome,campos){
	
}

function inserirCampoEspecifico(idCampo,dados){
	var sqlespecifico = "INSERT INTO texto(id,tamanho,validacao) VALUES("+idCampo+","+dados[0]+",'"+dados[1]+"')";
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db); 
	db.insert(sqlespecifico,function(id,dados){
		console.log(id);
	},null);
	
	//this.db.insert()
}


function inserirCampos(idForm,dados){

	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db); 
	
	var marcador,tipo,obrigatorio;
	var sqlcampo,sqlespecifico;
	/*console.log('chamei inserir campo para o form:'+idForm+" com os dados:");
	console.log(dados);*/
	
	
	for(var i in dados){
		 if(dados[i].tipo == undefined){
    	//	console.log('nao eh campo');
    	}else{
    		switch(dados[i].tipo){
    			case 'texto':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var tamanho = dados[i].comprimento;
    				var validacao = dados[i].validacao;
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				var arg =  Array();
    				arg.push(tamanho);
    				arg.push(validacao);
    				
	    				
    				//sqlespecifico = "INSERT INTO texto(id,tamanho,validacao) VALUES(0,"+tamanho+",'"+validacao+"')";
    				console.log(arg);
    				db.insert(sqlcampo,inserirCampoEspecifico,arg);
    			break;
    			
    			case 'area':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var largura = dados[i].altura; 
    				var altura  = dados[i].largura;
    				sqlcampo = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES(0,0,'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				sqlespecifico = "INSERT INTO areaTexto(id,largura,altura) VALUES(0,"+largura+","+altura+")";
    
    				
    			break;
    			
    			case 'upload':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var caminho = '/upload';
    				sqlcampo = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES(0,0,'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				sqlespecifico = "INSERT INTO upload(id,caminho) VALUES(0,'"+caminho+"')";
    				
    			break;
    			
    			case 'lista':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var opcoes = dados[i].opcoes;
    				sqlcampo = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES(0,0,'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				sqlespecifico = "INSERT INTO lista(id,opcoes) VALUES(0,'"+opcoes+"')";
    				
    			break;
    			
    			case 'marcacao':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var opcoes = dados[i].opcoes;
    				var multipla = dados[i].multipla;
    				sqlcampo = "INSERT INTO campo(id,id_formulario,nome,tipo,obrigatorio) VALUES(0,0,'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				sqlespecifico = "INSERT INTO caixa(id,multipla,opcoes) VALUES(0,"+multipla+",'"+opcoes+"')";
    				
					
    			break;
    			
    		}
    	}
	}	
	
}





module.exports = ModeloFormulario;
