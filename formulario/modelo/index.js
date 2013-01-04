var banco = require('./../../banco');
var configuracao = require('./../../configuracao/controle/');
ht = "";
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
	var h = 0;
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
    				var html  = "<input type=text nome="+marcador+" name=formulario["+marcador+"]/>"
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio,html) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+",\""+html+"\")";
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
    				console.log(sqlcampo);
    				db.insert(sqlcampo,inserirCampoEspecifico,arg);
    			break;
    			
    			case 'area':
     				
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? "1" : "0") ;
    				var largura = ((dados[i].altura == "") ? "0" : dados[i].altura ); 
    				var altura  = ((dados[i].largura == "") ? "0" : dados[i].largura );;
    				var html = "<textarea name=formulario["+marcador+"]></textarea>";
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio,html) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+",\""+html+"\")";
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
    				var html = "<input type=file name=formlario["+marcador+"]/>"
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio,html) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+",\""+html+"\")";
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
    				var html = "<select name=formulario["+marcador+"]>";
    				var opt = opcoes.split(',');
    				console.log(opt);
    				for(var j  = 0; j < opt.length; j++){
    					 html+="<option value="+j+">"+opt[j]+"</option>";
    				}
    				html+="</select>";
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio,html) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+",\""+html+"\")";
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
    				var opt = opcoes.split(',');
    				var multipla = ((dados[i].multipla == "on") ? "1" : "0");
    				var html = "";
    				console.log(opt);
    				if(multipla){
    					for(var j = 0; j < opt.length; j++){
    						html += "<input type=checkbox name=formulario["+marcador+"]/>"+opt[j];
    					}
    				}else{
    					for(var j = 0; j < opt.length; j++){
    						html += "<input type=radio name=formulario["+marcador+"] />"+opt[j];
    					}
    				}
    				
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio,html) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+",\""+html+"\")";
    				
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
    	h++;
	}
	table += ");"	
	console.log(table);
	db.executar(table);
}




ModeloFormulario.prototype.montarFormulario = function(request,response){
	
	
	
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	var sql = 'SELECT f.id as idform,f.nome as formulario,c.id,c.nome,c.tipo,c.obrigatorio,c.html FROM formulario f JOIN campo c ON c.id_formulario = f.id WHERE f.id ='+request.query.id;
	
	
	db.selectResponse(sql,response,function(result){
	
	
	
	var campos  = result;
	var numCampos = result.length;
	
	var html = " <!DOCTYPE html PUBLIC \"-\"http://www.w3.org/TR/html4/strict.dtd\">"
				+
				"<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en\">"
				+
				"<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"
				+
				"<title>Formulários</title>"
				+
				"<meta name=\"author\" content=\"Hermes\" />"
				+
				"<link rel=\"stylesheet\" href=\"/stylesheets/style.css\">"
				+
				"<script src='/javascripts/jquery.js' type=\"text/javascript\"></script>"
				+
				"<script src=\"/javascripts/principal.js\" type=\"text/javascript\"></script>"
				+
				"<script src=\"/javascripts/cufon-yui.js\"></script>"
				+
				"<script src=\"/javascripts/arial.js\" type=\"text/javascript\"></script>"
				+
				"<script src=\"/javascripts/cuf_run.js\" type=\"text/javascript\"></script>"
				+
				"<script src=\"/javascripts/radius.js\" type=\"text/javascript\"></script>"
 				+
				"</head>"
				+
				"<body>"
				+
				"<div class=main>"
				+
				"<div class=header>"
				+
				"<div class=header_resize>"
				+
				"<div class=menu_nav></div>"
				+
				"<div class=logo><h1><a href='#'>Gerenciador de formulários</a><small>Mais simples impossível</small></h1></div>"
				+
				"<div class=clr>"				
				+
				"</div>" //fim do div header_resize
				+
				"</div>"
				+
				"</div>" //fim do div header
				+
				"<div class=content>"
				+
				"<div class=content_resize>"
				+
				"<div class=mainbar>"
				+
				"<div class=article id=principal>"
			
				+
				"<h2 class=\"star\"><span>"+campos[0].formulario+"</span> </h2>"
				+
				"<form id=frm"+campos[0].idform+" action=\"/inserirDados\" method=\"post\" > <table> <input type=hidden value="+campos[0].idform+" name=formulario[id]>"
				;
	
	
				
	
	
	
		
		for(var i = 0; i < numCampos; i++){
			html += "<tr><td>"+campos[i].nome+"</td><td>"+campos[i].html+"</td></tr>";
			
	
			
		}
		
		html += "<tr><td><input type=submit><input type=reset></td><td></td></tr></table></div>" //fim do article
				+
				"</div>" //fim do mainbar
				+
				"<div class=sidebar>"
				+
				"<div class=gadget>"
				+
				"<h2><span>Menu Lateral</span></h2>"
				+
				"<div class=clr></div>"
				+
				"<ul class=sb_menu>"
				+
				"<li><a href='formularios'>Formulários</a></li>"
				+
				"<li><a href='configuracao'>Configuração</a></li>"
				+
				"<li><a href='documentacao'>Documentação</a></li>"
				+
				"</ul>"
				+
				"</div>" // fim do gadget
				+
				"</div>" // fim do sidebar
				
				+
				"</div>" //fim do content_resize
				+
				"</div>" //fim do div content
				+
				"<div class=clr></div>"
				+
				"<div class=fbg>"
				+
				"<div class=fbg_resize>"
				+
				"<div class='col c1'></div>"
				+
				"<div class='col c2'></div>"
				+
				"<div class='col c3'></div>"
				+
				"<div class=clr></div>"
				+
				"</div>" //fim do fbg_resize
				+
				"</div>" // fim do fbg
				+
				"<div class=footer>"
				+
				"<div class=footer_resive>"
				+
				"<div class=clr></div>"
				+
				"</div>"
				+
				"</div>" //fim footer
				+
				"</body>"
				+
				"</html>";
		//console.log(result);
	response.write(html);	
	response.end();		
	});

	
	
		
}


module.exports = ModeloFormulario;
