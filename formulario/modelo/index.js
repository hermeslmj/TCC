var banco = require('./../../banco');
var configuracao = require('./../../configuracao/controle/');

String.prototype.replaceAll = function(de, para){
    var str = this;
    var pos = str.indexOf(de);
    while (pos > -1){
		str = str.replace(de, para);
		pos = str.indexOf(de);
	}
    return (str);
}

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
	data_atual = data_atual.getDay()+'-'+data_atual.getMonth()+'-'+data_atual.getFullYear();
	sql = 'INSERT INTO formulario(nome,data_criacao) VALUES("'+ dados['name'] +'","'+ data_atual +'")';
	
	this.db.insert(sql,inserirCampos,dados);
	
	
	
	
	//console.log(dados);	
	

	
}
ModeloFormulario.prototype.editar = function(nome,campos){
	
}
ModeloFormulario.prototype.apagar = function(nome,campos){
	
}

function inserirCampoEspecifico(idCampo,dados){
	
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	
	
	
	switch(dados[0]){
		case 'texto':
			var sqlespecifico = "INSERT INTO texto(id,tamanho,validacao) VALUES("+idCampo+","+dados[1]+",'"+dados[2]+"')";
			db.insert(sqlespecifico,function(id,dados){
				//console.log(id);
			},null);	
		break;
		case 'area':
			var sqlespecifico = "INSERT INTO areaTexto(id,largura,altura) VALUES("+idCampo+","+dados[1]+","+dados[2]+")";
			db.insert(sqlespecifico,function(id,dados){
				//console.log(id);
			},null);	
		break;
		case 'upload':
			var sqlespecifico = "INSERT INTO upload(id,caminho) VALUES("+idCampo+",'"+dados[1]+"')";
			db.insert(sqlespecifico,function(id,dados){
				//console.log(id);
			},null);	
		break;
		case 'lista':
			var sqlespecifico = "INSERT INTO lista(id,opcoes) VALUES("+idCampo+",'"+dados[1]+"')";
			db.insert(sqlespecifico,function(id,dados){
				//console.log(id);
			},null);	
		break;
		case 'marcacao':
			var sqlespecifico = "INSERT INTO caixa(id,multipla,opcoes) VALUES("+idCampo+",'"+dados[1]+"','"+dados[2]+"')";
			db.insert(sqlespecifico,function(id,dados){
				//console.log(id);
			},null);	
		break;
	}
	 
	
	
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
	var table = "CREATE TABLE frm"+idForm+"( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY";
	
	for(var i in dados){
		 if(dados[i].tipo == undefined){
    	//	console.log('nao eh campo');
    	}else{
    		switch(dados[i].tipo){
    			case 'texto':
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var tamanho = ((dados[i].comprimento == "") ? "0" : dados[i].comprimento);
    				var validacao = dados[i].validacao;
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				var arg =  Array();
    				arg.push('texto');
    				arg.push(tamanho);
    				arg.push(validacao);
    				
    				if(tamanho == 0){
    					marcador = marcador.replaceAll(' ','_');
    					marcador = marcador.replaceAll('/','_');
    					table += ", "+marcador+" BLOB "+ ((obrigatorio == 1) ? "NOT NULL" : "");
    				} else{
    					table += ","+marcador+" VARCHAR("+ tamanho +") "+((obrigatorio == 1) ? "NOT NULL" : "");
    				}
    				
	    				
    				//sqlespecifico = "INSERT INTO texto(id,tamanho,validacao) VALUES(0,"+tamanho+",'"+validacao+"')";
    				
    				db.insert(sqlcampo,inserirCampoEspecifico,arg);
    			break;
    			
    			case 'area':
     				
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var largura = ((dados[i].altura == "") ? "0" : dados[i].altura ); 
    				var altura  = ((dados[i].largura == "") ? "0" : dados[i].largura );;
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				//sqlespecifico = "INSERT INTO areaTexto(id,largura,altura) VALUES(0,"+largura+","+altura+")";
    				var arg =  Array();
    				arg.push('area');
    				arg.push(largura);
    				arg.push(altura);
    				
    				
    					marcador = marcador.replaceAll(' ','_');
    					marcador = marcador.replaceAll('/','_');
    				table += ", "+marcador+" TEXT "+ ((obrigatorio == 1) ? "NOT NULL" : "");
    					
    				db.insert(sqlcampo,inserirCampoEspecifico,arg);
    			break;
    			
    			case 'upload':
    			
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var caminho = '/upload';
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				//sqlespecifico = "INSERT INTO upload(id,caminho) VALUES(0,'"+caminho+"')";
    				var arg =  Array();
    				arg.push('upload');
    				arg.push(caminho);
    				
    					marcador = marcador.replaceAll(' ','_');
    					marcador = marcador.replaceAll('/','_');
    				table += ", "+marcador+" TEXT "+ ((obrigatorio == 1) ? "NOT NULL" : "");
    				
    				db.insert(sqlcampo,inserirCampoEspecifico,arg);
    				
    			break;
    			
    			case 'lista':
    			
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var opcoes = dados[i].opcoes;
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				//sqlespecifico = "INSERT INTO lista(id,opcoes) VALUES(0,'"+opcoes+"')";
    				var arg =  Array();
    				arg.push('lista');
    				arg.push(opcoes);
    				
    					marcador = marcador.replaceAll(' ','_');
    					marcador = marcador.replaceAll('/','_');
    				table += ", "+marcador+" TEXT "+ ((obrigatorio == 1) ? "NOT NULL" : "");	
    				
    				db.insert(sqlcampo,inserirCampoEspecifico,arg);
    			break;
    			
    			case 'marcacao':
    			
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var opcoes = dados[i].opcoes;
    				var multipla = dados[i].multipla;
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+")";
    				//sqlespecifico = "INSERT INTO caixa(id,multipla,opcoes) VALUES(0,"+multipla+",'"+opcoes+"')";
    				var arg =  Array();
    				arg.push('marcacao');
    				arg.push(multipla);
    				arg.push(opcoes);
    				
    					marcador = marcador.replaceAll(' ','_');
    					marcador = marcador.replaceAll('/','_');
    				table += ", "+marcador+" TEXT "+ ((obrigatorio == 1) ? "NOT NULL" : "");	
    				
					db.insert(sqlcampo,inserirCampoEspecifico,arg);
    			break;
    			
    		}
    	}
	}
	table += ");"	
	console.log(table);
	db.executar(table);
}

function montarCampo(campo,response){
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	switch(campo.tipo){
		case 'texto':
			var sql = "SELECT * FROM texto WHERE id = "+campo.id;
			db.selectResponse(sql,response,function(result){
				console.log('entrei');
				response.write("<h1>teste</h1><form><label for="+campo.nome+">"+campo.nome+"</label>  </form>");
				response.write("<h2>INSERINDO OUTRA SAIDA.</h2>")
				response.end();
			})
				
			
		break;
	}
	
}


ModeloFormulario.prototype.montarFormulario = function(request,response){
	
	
	
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	var sql = 'SELECT c.id,c.nome,c.tipo,c.obrigatorio FROM formulario f JOIN campo c ON c.id_formulario = f.id WHERE f.id ='+request.query.id;
	//console.log(sql);
	db.selectResponse(sql,response,function(result){
	
	
	
	var campos  = result;
	var numCampos = result.length;
	
	
		
		for(var i = 0; i < numCampos; i++){
			//var sql = "SELECT ";
			var campo  = campos[i];
			montarCampo(campo,response);
		}
		//console.log(result);
		
			
	});
		
}


module.exports = ModeloFormulario;
