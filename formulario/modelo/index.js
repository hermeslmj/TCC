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
	mes = data_atual.getMonth();
	mes += 1;
	data_atual = data_atual.getDate()+'-'+mes+'-'+data_atual.getFullYear();
	sql = 'INSERT INTO formulario(nome,data_criacao) VALUES("'+ dados['name'] +'","'+ data_atual +'")';
	
	this.db.insert(sql,inserirCampos,dados);
	
	
	
	
	//console.log(dados);	
	

	
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
    				 html = "";
    				marcador = dados[i].marcador;
    				tipo  = dados[i].tipo;
    				obrigatorio = ((dados[i].obrigatorio == "on") ? 1 : 0) ;
    				var tamanho = ((dados[i].comprimento == "") ? 0 : dados[i].comprimento);
    				var validacao = dados[i].validacao;
    				
    				if(tamanho > 0 ){
    					if(obrigatorio){
    						 html+= "<input type=text nome="+marcador+" name=formulario["+marcador+"] maxlength="+tamanho+" class=required ";
    					}else{
    						 html+= "<input type=text nome="+marcador+" name=formulario["+marcador+"] maxlength="+tamanho+"  class='";
    					}
    				}else{
    					if(obrigatorio){
    						 html+= "<input type=text nome="+marcador+" name=formulario["+marcador+"] class='required ";
    					}else{
    						 html+= "<input type=text nome="+marcador+" name=formulario["+marcador+"] class='";
    					}	
    					
    				}
    				switch(validacao){
    					case '0':
    						html+="' \>";
    					break;
    					case '1':
    						html+="number' \>";
    					break;
    					case '2':
    						html+="number' maxlength=13  \>";
    					break;
    					case '3':
    						html+="email'  \>";
    					break;
    					case '4':
    						html+="cpf' \>";
    					break;
    					case '5':
    						html+="date' \>";
    					break;
    				}
    				
    				
    				sqlcampo = "INSERT INTO campo(id_formulario,nome,tipo,obrigatorio,html) VALUES("+idForm+",'"+marcador+"','"+tipo+"',"+obrigatorio+",\""+html+"\")";
    				var arg =  Array();
    				arg.push('texto');
    				arg.push(tamanho);
    				arg.push(validacao);
    				
    				if(tamanho == 0){
    					marcador = marcador.replaceAll(' ','_');
    					marcador = marcador.replaceAll('/','_');
    					table += ", "+marcador+" TEXT "+ ((obrigatorio == 1) ? "NOT NULL" : "");
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
    				obrigatorio = ((dados[i].obrigatorio == "on") ? 1 : 0) ;
    				//var largura = ((dados[i].altura == "") ? "0" : dados[i].altura ); 
    				//var altura  = ((dados[i].largura == "") ? "0" : dados[i].largura );
    				var largura = 300;
    				var altura = 300;
    			
    				if(obrigatorio){
    					var html = "<textarea name=formulario["+marcador+"] class='required'></textarea>";	
    				}else{
    					var html = "<textarea name=formulario["+marcador+"] ></textarea>";
    				}
    				
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
    				obrigatorio = ((dados[i].obrigatorio == "on") ? 1 : 0) ;
    				var caminho = '/upload';
    				if(obrigatorio){
    					var html = "<input type=file name=formlario["+marcador+"] class='required' />"	
    				}else{
    					var html = "<input type=file name=formlario["+marcador+"] />"
    				}
    				
    				
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
    				obrigatorio = ((dados[i].obrigatorio == "on") ? 1 : 0) ;
    				var opcoes = dados[i].opcoes;
    				
    				if(obrigatorio)
    					var html = "<select name=formulario["+marcador+"] class='required'>";
    				else
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
    				obrigatorio = ((dados[i].obrigatorio == "on") ? 1 : 0) ;
    				var opcoes = dados[i].opcoes;
    				var opt = opcoes.split(',');
    				
    				var multipla = ((dados[i].multipla == "unica") ? 0 : 1);
    				var html = "";
					console.log(multipla);    				
    				if(multipla == 1){
    					if(obrigatorio){
    						for(var j = 0; j < opt.length; j++){
    							html += "<input type=checkbox name=formulario["+marcador+"] class='required' value="+opt[j]+" />"+opt[j];
    						}	
    					}else{
    						for(var j = 0; j < opt.length; j++){
    							html += "<input type=checkbox name=formulario["+marcador+"] value="+opt[j]+" />"+opt[j];
    						}
    					}
    					
    				}else{
    					if(obrigatorio){
    						for(var j = 0; j < opt.length; j++){
    							html += "<input type=radio name=formulario["+marcador+"] class='required'value="+opt[j]+"  />"+opt[j];
    						}	
    					}else{
    						for(var j = 0; j < opt.length; j++){
	    						html += "<input type=radio name=formulario["+marcador+"] value="+opt[j]+" />"+opt[j];
    						}
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
	console.log(sql);
	
	db.selectResponse(sql,response,function(response,result){
	
	
	
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
				"<script src=\"/javascripts/jquery.validate.js\" type=\"text/javascript\"></script>"
 				+
 				"<script src=\"/javascripts/funcoes.js\" type=\"text/javascript\"></script>"
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
				"<form id=formulario  name=frm"+campos[0].idform+" action=\"/inserirDados\" method=\"post\" > <table> <input type=hidden value="+campos[0].idform+" name=formulario[id]>"
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

ModeloFormulario.prototype.inserirDados = function(dados,response){
	
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	
	var sql;
	
	
	for(var i in dados.formulario){
		if(i == 'id'){
			sql = "INSERT INTO frm"+dados.formulario[i]+"(";
		}else{
			sql += "`"+i+"`,";
		}
	}
		
	sql = sql.substr(0,sql.length-1);
	sql += ") VALUES(";
	
	for(var i in dados.formulario){
		if(i == 'id'){
			
		}else{
			sql += "'"+dados.formulario[i]+"',";
		}
	}
	sql = sql.substr(0,sql.length-1);
	sql += ")";
	console.log(sql);
	db.executar(sql);
	response.write("<script type=text/javascript>window.location.href='/'</script>");
	response.end();
}

ModeloFormulario.prototype.verDados =  function(request,response){
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	
	if(request.query.id == undefined){
		var sql = 'SELECT * FROM frm'+request.query.pesquisar['id']+" WHERE `"+request.query.pesquisar['campo']+"`LIKE '%"+request.query.pesquisar['filtro']+"%'";
		console.log(sql);
	}else{
		var sql = 'SELECT * FROM frm'+request.query.id;	
		console.log(sql);
	}
	
	
	
	
	db.selectResponse2(sql,response,function(response,result,field){
	
	
	
	var campos  = result;
	var numCampos = result.length;
	
	var c = 0;
	console.log(field);
	//console.log(result);
	
	//console.log(campos);	
		var html = " <!DOCTYPE html PUBLIC \"-\"http://www.w3.org/TR/html4/strict.dtd\">"
				+
				"<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en\">"
				+
				"<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"
				+
				"<title>Dados do formulário</title>"
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
				"<h2 class=\"star\"><span>Formulários</span> </h2>";
				
				
				html += "<form name=pesquisa action=/verform method=get><table><tr><td>Filtrar</td><td><input type=hidden name=pesquisar[id] value="+request.query.id+"></td><td><select id=campo name=pesquisar[campo]>"; 
				
				for(var q in field){
					console.log(q);
					html += "<option value="+field[q].name+">"+field[q].name+"</option>"
				}
				html +="</select></td><td><input type=text name=pesquisar[filtro] /></td><td><input type=submit value=Pesquisar></td></tr></table></form>"
				
				html +=	"<table class='tabela'><tr style=\"background-color: #EEE9E9; color:#000000\" >";
				for(var h in field){
					c++;
					html += "<td>"+field[h].name+"</td>"
				}
				html += "<td></td></tr>"
					
				var muda = 0;
				
				for(var i = 0; i < numCampos; i++){
					
					if(muda == 0){	
						html += "<tr style=\" color:#000000 \">";
						
						
						muda = 1;
					}else{
						html += "<tr style=\"background-color: #EEE9E9; color:#000000\">";
						muda = 0;	
					}
					//console.log(campos[i]);
					campo = campos[i];
					teste = c;
					for(var j in campos[i]){
						//console.log(j);
						html += "<td>"+campo[j]+"</td>";
						teste--;
						if(teste == 0)break;
						
					}
					html += "<td><a href=excluirdado?id="+campo.id+"&idform="+request.query.id+">Excluir</a></td></tr>";
					
					
				}
				
				
				
				html += "</table>"
				+
				"</div>" //fim do article
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

	
	
	
	response.write(html);	
	response.end();		
	});
	
}

ModeloFormulario.prototype.excluirform =  function(request,response){
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	var sql = 'DELETE FROM formulario WHERE id='+request.query.id;
	console.log(sql);
	db.executar(sql);
	sql = 'DROP TABLE frm'+request.query.id;
	console.log(sql);
	db.executar(sql);
		response.write("<script type='text/javascript'>window.location.href = '/'</script>");
	response.end();
	
}

ModeloFormulario.prototype.excluirdado = function(request,response){
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	var sql = "DELETE  FROM frm"+request.query.idform+" WHERE id="+request.query.id;
	db.executar(sql);
	response.write("<script type='text/javascript'>window.location.href = '/'</script>");
	response.end();
	
	
	
	
}
function montarFormularioEdicao(response,result){
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	console.log(result);
	var campos  = result;
	campos.push(JSON.parse("{\"tipo\": \"ultimo\"}"));
	console.log(campos);
	
	
	var html = "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01//EN \"http://www.w3.org/TR/html4/strict.dtd\">"
	+
	"<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en\">"
	+
	"<head>"
	+
	"	<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"
	+
	"<title>cadastro</title>"
	+
	"<meta name=\"author\" content=\"Hermes\" />"
	+
	"<script type=\"text/javascript\" src=\"javascripts/jquery.js\"></script>"
	+
	"<script type=\"text/javascript\" src=\"javascripts/campos.js\"></script>"
	+		
	"</head>"
	+
	"<body>"
	+
	"<form method=\post\ action=\/gerenciarformulario\>"
	+
	"<table style=\"width: 100%; background-color:#D8DBDC\">"
	+
	"<tr>"
	+
	"<td style=\"width: 25%\">"
	+
	"<label>Nome do formulário</label>"
	+
	"</td>"
	+
	"<td>"
	+
	"<input type=\"text\" name=\"form[name]\" style=\"width: 97%\" />"
	+
	"</td>"
	+
	"</tr>"
	+
	"<tr>"
	+
	"<td>"
	+
	"<label for='tipos'>Campos:</label>"
	+
	"</td>"
	+
	"<td>"
	+
	"<select id='tipos' style=\"width: 73%\">"
	+
	"<option value=\"texto\">Texto</option>"
	+
	"<option value=\"area\">Área de texto</option>"
	+
	"<option value=\"lista\">Lista</option>"
	+
	"<option value=\"caixa\">Caixa de Marcação</option>"
	+
	"<option value=\"up\">Upload</option>"
	+
	"</select>"
	+
	"<input type=\"button\" id=\"add\" value=\"Adicionar Campo\" onclick=\"adicionaCampo('campos',$('#tipos option:selected').val())\" />"
	+
	"</td>"
	+
	"</tr>"
	+
	"</table>"
	+	
	"<hr>"
	+
	"<div style=\"width: 100%\" id='campos'>";
	
	response.write(html);
	
	for(var i = 0; i <  campos.length; i++){
			switch(campos[i].tipo){
				case 'texto':
					sql = "SELECT c.*,t.tamanho,t.validacao FROM texto t JOIN campo c ON c.id = t.id WHERE t.id="+campos[i].id;
					console.log(sql);
					db.selectResponse(sql,response,function(response,result){
						var obr = (result[0].obrigatorio == 1) ? "checked" : "";
						var valid = new Array(6);
						var i = 0;
												
						for(i = 0; i < 6; i++){
							if(result[0].validacao == i){
								valid[i] = 'selected';
							}
							
							else{
								valid[i] = '';
								}
						}
						
						var campo = "<div class=campo   id= "+result[0].id+" ><table>"
						+
						"<tr>Campo Texto </tr>"
				    	+
				    	"<input type=hidden name = form[campo"+result[0].id+"][form]  id=campo"+result[0].id+"form value="+result[0].id_formulario+">"
				    	+
				    	"<tr><td>Marcador:</td><td><input type=text name = form[campo"+result[0].id+"][marcador] id=campo"+result[0].id+"marcador value="+result[0].nome+"  readonly ></td></tr>"	
						+
						"<tr><td>Tamanho Máximo:</td><td><input type=text name = form[campo"+result[0].id+"][comprimento] id=campo"+result[0].id+"comprimento value="+result[0].tamanho+" ></td></tr>"
						+
						"<tr><td>Obrigatório</td><td><input type=checkbox  name = form[campo"+result[0].id+"][obrigatorio] id=campo"+result[0].id+"obrigatorio checked="+obr+" ></td></tr>"	
						+
						"<tr><td>Validação:</td><td><select name = form[campo"+result[0].id+"][validacao] id=campo"+result[0].id+"validacao >"
						+
						"<option value='0' "+valid[0]+" >...</option>"
						+
						"<option value='1' "+valid[1]+" >Números</option>"
						+
						"<option value='2' "+valid[2]+" >Telefone/celular</option>"
						+
						"<option value='3' "+valid[3]+" >Email</option>"
						+
						"<option value='4' "+valid[4]+" >CPF</option>"
						+
						"<option value='5' "+valid[5]+" >Data</option>"
						+
						"</select></td></tr>"	
						+
						"<tr><td><input type = hidden  name = form[campo"+result[0].id+"][tipo] id=campo"+result[0].id+"tipo value='texto'></td></tr>"
						+
						"<tr><td><input align='right' value='Remover' type='button' onclick='deletacampo("+result[0].id+",$(\"#campo"+result[0].id+"form\").val(),$(\"#campo"+result[0].id+"marcador\").val())' ></td>"
						+
						"<td><input align=right value=Editar type=button onclick='editartexto("+result[0].id+",$(\"#campo"+result[0].id+"marcador\").val(),$(\"#campo"+result[0].id+"comprimento\").val(),$(\"#campo"+result[0].id+"obrigatorio\").is(\":checked\"),$(\"#campo"+result[0].id+"validacao :selected\").val(),$(\"#campo"+result[0].id+"form\").val(),$(\"#campo"+result[0].id+"tipo\").val())'></td></tr></table><hr>"
						+
						"</div>";

						
						
						
						response.write(campo);
						
						
					});
						
					
				break;
				case 'area':
					sql = "SELECT c.*,ta.largura,ta.altura FROM areaTexto ta JOIN campo c ON c.id=ta.id WHERE ta.id="+campos[i].id;
					console.log(sql);
					db.selectResponse(sql,response,function(response,result){
						console.log('area');
						var obr = (result[0].obrigatorio == 1) ? "checked" : "";
								
									var campo = "<div class=campo id="+result[0].id+"><table>"
					+
				"<tr>Área de Texto </tr>"
				    +
				
				    	"<input type=hidden name = form[campo"+result[0].id+"][form] id=campo"+result[0].id+"form value="+result[0].id_formulario+">"
					+

				"<tr><td>Marcador:</td><td><input type=text  name = form[campo"+result[0].id+"][marcador] id = campo"+result[0].id+"marcador value="+result[0].nome+" readonly ></td></tr>"	
				
					+
				/*"<tr><td>Largura</td><td><input type=text name = form[campo"+num_campos+"][largura] /></td></tr>"	
					+
				"<tr><td>Altura</td><td><input type=text name = form[campo"+num_campos+"][altura] /></td></tr>"
					+*/
				
				"<tr><td>Obrigatório</td><td><input type=checkbox name = form[campo"+result[0].id+"][obrigatorio] id=campo"+result[0].id+"obrigatorio  checked="+obr+" ></td></tr>"

					+
				"<tr><td><input type = hidden name = form[campo"+result[0].id+"][tipo] value='area' id=campo"+result[0].id+"tipo ></td></tr>"
					+
				"<tr><td><input align='right' value='Remover' type='button' onclick='deletacampo("+result[0].id+",$(\"#campo"+result[0].id+"form\").val(),$(\"#campo"+result[0].id+"marcador\").val())' ></td>"
						+
				"<td><input align='right' value='Editar' type='button' onclick='editararea("+result[0].id+",$(\"#campo"+result[0].id+"marcador\").val(),$(\"#campo"+result[0].id+"obrigatorio\").is(\":checked\"),$(\"#campo"+result[0].id+"form\").val(),$(\"#campo"+result[0].id+"tipo\").val())' ></td></tr></table><hr>";
				+"</div>"
					response.write(campo);
						//	console.log(response);
						
					});
					
				break;
				case 'lista':
					sql = "SELECT c.*,l.opcoes FROM lista l JOIN campo c ON c.id=l.id WHERE l.id="+campos[i].id;
					console.log(sql);
							
					
					db.selectResponse(sql,response,function(response,result){
						var obr = (result[0].obrigatorio == 1) ? "checked" : "";
						var campo = "<div class=campo id="+result[0].id+"><table>"
					+
				"<tr>Lista </tr>"
					+
				    	"<input type=hidden name = form[campo"+result[0].id+"][form] id=campo"+result[0].id+"form value="+result[0].id_formulario+">"
					+

				"<tr><td>Marcador:</td><td><input type=text name = form[campo"+result[0].id+"][marcador] id=campo"+result[0].id+"marcador value="+result[0].nome+" readonly></td></tr>"
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = form[campo"+result[0].id+"][obrigatorio] id=campo"+result[0].id+"obrigatorio "+obr+" ></td></tr>"
					+
				"<tr><td>Opções(Digite as opções da lista separadas por vírgula)</td><td><input type = text name = form[campo"+result[0].id+"][opcoes] id=campo"+result[0].id+"opcoes value="+result[0].opcoes+" ></td></tr>"
					+	
					"<tr><td><input type = hidden name = form[campo"+result[0].id+"][tipo] id=campo"+result[0].id+"tipo value='lista'></td></tr>"
					+
				"<tr><td><input align='right' value='Remover' type='button' onclick='deletacampo("+result[0].id+",$(\"#campo"+result[0].id+"form\").val(),$(\"#campo"+result[0].id+"marcador\").val())' ></td>"
						+
				"<td><input align='right' value='Editar' type='button' onclick='editarlista("+result[0].id+",$(\"#campo"+result[0].id+"marcador\").val(),$(\"#campo"+result[0].id+"obrigatorio\").is(\":checked\"),$(\"#campo"+result[0].id+"opcoes \").val(),$(\"#campo"+result[0].id+"form\").val(),$(\"#campo"+result[0].id+"tipo\").val())' ></td></tr></table><hr>";
							response.write(campo);
						
					});
				break;
				case 'marcacao':
					sql = "SELECT c.*,m.opcoes,m.multipla FROM caixa m JOIN campo c ON c.id=m.id WHERE m.id="+campos[i].id;
					console.log(sql);
					db.selectResponse(sql,response,function(response,result){
						var mult = "";
						var single = "";
						multi = (result[0].multipla == 1) ? "checked": "";
						single = (result[0].multipla == 0) ? "checked": "";
						var obr = (result[0].obrigatorio == 1) ? "checked" : "";
						var campo = "<div class=campo id="+result[0].id+"><table>"
					+
				"<tr>Caixa de Marcação </tr>"
					+
					
				    	"<input type=hidden name = form[campo"+result[0].id+"][form]  id=campo"+result[0].id+"form value="+result[0].id_formulario+">"
+
				"<tr><td>Marcador:</td><td><input type=text name = form[campo"+result[0].id+"][marcador] id=campo"+result[0].id+"marcador value="+result[0].nome+"  readonly></td></tr>"
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = form[campo"+result[0].id+"][obrigatorio]  id=campo"+result[0].id+"obrigatorio "+obr+"/></td></tr>"
					+
				"<td>Opção única:</td><td><input type=radio value = unica name= form[campo"+result[0].id+"][multipla] id=campo"+result[0].id+"unica "+single+" /></td><td>Opções multiplas</td><td><input type=radio value = multi name=form[campo"+result[0].id+"][multipla] id=campo"+result[0].id+"multi "+multi+"/></td>"
					+
				"<tr><td>Opções(Digite as opções da caixa separadas por vírgula)</td><td><input type = text name = form[campo"+result[0].id+"][opcoes] id=campo"+result[0].id+"opcoes  value="+result[0].opcoes+"></td></tr>"
					+	
					"<tr><td><input type = hidden name = form[campo"+result[0].id+"][tipo] value='marcacao' id=campo"+result[0].id+"tipo></td></tr>"
					+
						"<tr><td><input align='right' value='Remover' type='button' onclick='deletacampo("+result[0].id+",$(\"#campo"+result[0].id+"form\").val(),$(\"#campo"+result[0].id+"marcador\").val())' ></td>"
						+
				"<td><input align='right' value='Editar' type='button' onclick='editarcaixa("+result[0].id+",$(\"#campo"+result[0].id+"marcador\").val(),$(\"#campo"+result[0].id+"obrigatorio\").is(\":checked\"),$(\"#campo"+result[0].id+"opcoes \").val(),$(\"#campo"+result[0].id+"multi \").is(\":checked\"),$(\"#campo"+result[0].id+"unica \").is(\":checked\"),$(\"#campo"+result[0].id+"form\").val(),$(\"#campo"+result[0].id+"tipo\").val())'></td></tr></table><hr>";
							response.write(campo);
					});
				break;
				case 'upload':
					sql = "SELECT c.*,u.caminho FROM upload u JOIN campo c ON c.id=u.id WHERE u.id="+campos[i].id;
					console.log(sql);
					db.selectResponse(sql,response,function(response,result){
									var campo = "<div class=campo id="+result[0].id+"><table>"
					+
				"<tr>Upload de arquivo </tr>"
				   +
				    	"<input type=hidden name = form[campo"+result[0].id+"][form]  id=campo"+result[0].id+"form value="+result[0].id_formulario+">"
				    +
				

				"<tr><td>Marcador:</td><td><input type=text name = form[campo"+result[0].id+"][marcador] readonly /></td></tr>"	
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = form[campo"+result[0].id+"][obrigatorio] /></td></tr>"
				+
				"<tr><td><input type = hidden name = form[campo"+result[0].id+"][tipo] value='upload'></td></tr>"
					+
		"</table><input align='right' value='Remover' type='button' onclick=$('#upload_"+result[0].id+"').remove();><hr></div>";
					
							
							response.write(campo);
						
						
					});
				break;
				case 'ultimo':
				console.log('ult');
					db.selectResponse("SELECT * FROM campo",response,function(response,result){
						html = 	"</div>"
						+
						"<fieldset>"
						+
						"<legend>Personalização:</legend>"
						+
						"<label>Mensagem de envio:</label>"
						+
						"<input type=\"text\" value=\"Dados enviados com sucesso\"  style=\"width: 70%\"/>"
						+
						"</fieldset>"
						+
						"<input type=\"submit\" />"
						+
						"</form>"
						+
						"</body>"
						+
						"</html>";
						
						response.end(html);
					})
				break;
				
			}
		
		}
	
		

}

ModeloFormulario.prototype.editarform = function(request,response){
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	var sql = "SELECT * FROM campo WHERE id_formulario="+request.query.id;
	
	db.selectResponse(sql,response,montarFormularioEdicao);		


	
	
}
ModeloFormulario.prototype.apagarCampo = function(dados,response){
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	
	var sql = "ALTER TABLE frm"+dados.form+" DROP COLUMN "+dados.marcador;
	var sql2 = "DELETE FROM campo WHERE id="+dados.id;
	
	db.executar(sql);
	db.executar(sql2);
	
}

ModeloFormulario.prototype.editarCampo = function(dados,response){
	var db = new banco();
	var config = new configuracao();
	var c = config.retornaConfiguracao();	
	db.conect(c.user,c.password,c.host,c.db);
	
	switch(dados.tipo){
		case 'texto':
		console.log(dados);
					html = "";
    				marcador = dados.nome;
    				obrigatorio = dados.obrigatorio;
    				var tamanho = ((dados.comprimento == "") ? 0 : dados.comprimento);
    				var validacao = dados.validacao;
    				var idForm = dados.form;
    				var tipo = dados.tipo;
    				if(tamanho > 0 ){
    					if(obrigatorio){
    						 html+= "<input type=text nome="+marcador+" name=formulario["+marcador+"] maxlength="+tamanho+" class=required ";
    					}else{
    						 html+= "<input type=text nome="+marcador+" name=formulario["+marcador+"] maxlength="+tamanho+"  class='";
    					}
    				}else{
    					if(obrigatorio){
    						 html+= "<input type=text nome="+marcador+" name=formulario["+marcador+"] class='required ";
    					}else{
    						 html+= "<input type=text nome="+marcador+" name=formulario["+marcador+"] class='";
    					}	
    					
    				}
    				
    				switch(validacao){
    					case '0':
    				console.log(validacao);	
    						html+="' \>";
    					break;
    					case '1':
    						html+="number' \>";
    					break;
    					case '2':
    						html+="number' maxlength=13  \>";
    					break;
    					case '3':
    						html+="email'  \>";
    					break;
    					case '4':
    						html+="cpf' \>";
    					break;
    					case '5':
    						html+="date' \>";
    					break;
    				}
    				
    				
    				sqlcampo = "UPDATE 	`campo` SET `nome` = '"+marcador+"',`tipo` = '"+tipo+"',`obrigatorio` = "+obrigatorio+",`html` = \""+html+"\" WHERE `id`="+dados.id;
    				console.log(sqlcampo);
    				//db.executar(sqlcampo);
    		
		break;
		case 'area':
		
		break;
		case 'lista':
		
		break;
		case 'caixa':
		
		break;
		case 'up':
		
		break;
	}
	
	
	
	
}


module.exports = ModeloFormulario;
