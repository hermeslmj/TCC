var arquivos = require('../arquivos');
var controle = require('../configuracao/controle');	
var banco = require('./banco');

function GerenciadorDeRequisicao(){
	this.GerenciadorDeArquivos = new arquivos();
	this.controleDeConfiguracao = new controle();
}

/*Configuração*/


GerenciadorDeRequisicao.prototype.configuracao = function(request,response){
	var host;
	var user;
	var password;
	var db;
		
		
	if(this.GerenciadorDeArquivos.existeArquivo('arquivos/configuracao.json')){
		 this.GerenciadorDeArquivos.leArquivo('arquivos/configuracao.json');
		 var dados = this.GerenciadorDeArquivos.retornaJSON();
		 
		 host = dados.host;
		 user = dados.user;
		 password = dados.password;
		 db = dados.db;
		 
	}else{
		 host = "";
		 user = "";
		 password = "";
		 db = "";
	}
	var html = " <!DOCTYPE html PUBLIC \"-\"http://www.w3.org/TR/html4/strict.dtd\">"
				+
				"<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en\">"
				+
				"<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"
				+
				"<title>Configuração</title>"
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
				"<h2 class=star><span>Configuração</span></h2>"
				+
				"<form method=\"post\" action=\"/gerenciarConfiguracao\">"
				
				+
				"<fieldset>"
				+
				"<legend>Banco de Dados</legend>"
				+				
				"<table>"
				+
				"<tr>"
				+
				"<td>"
				+
				"Nome do banco de dados:"
				+
				"</td>"
				+
				"<td>"
				+
				"<input type=\"text\" name=\"banco[nome]\" value="+db+" />"
				+
				"</td>"
				+
				"</tr>"
				+
				"<tr>"
				+
				"<td>"
				+
				"Usuário:"
				+
				"</td>"
				+
				"<td>"
				+
				"<input type=\"text\" name=\"banco[usuario]\"  value="+user+" />"
				+
				"</td>"
				+
				"</tr>"
				+
				"<tr>"
				+
				"<td>"
				+
				"Senha:"
				+
				"</td>"
				+
				"<td>"
				+
				"<input type=\"password\" name=\"banco[senha]\" value="+password+"  />"
				+
				"</td>"
				+
				"</tr>"
				+
				"<tr>"
				+
				"<td><input type=\"submit\" value=\"Enviar\" /> </td>"
				+
				"<td><input type=\"submit\" value=\"Cancelar\" /> </td>"
				+
				"</tr>"
				+
				"</table>"
				+
				"</fieldset>"
				+
				"</form>"
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
}

GerenciadorDeRequisicao.prototype.gerenciarConfiguracao = function(request,response){
		
	var conf = request.body;
	
	console.log(conf);
	if(this.GerenciadorDeArquivos.existeArquivo('./arquivos/configuracao.json')){
		this.controleDeConfiguracao.editarConfiguracao(conf.banco['usuario'],conf.banco['senha'],'localhost',conf.banco['nome']);
		
	}else{
		
		this.controleDeConfiguracao.novaConfiguracao(conf.banco['usuario'],conf.banco['senha'],'localhost',conf.banco['nome']);	
	}

}


/*Formulário*/
GerenciadorDeRequisicao.prototype.formulario = function(request,response){
	var html = " <!DOCTYPE html PUBLIC \"-\"http://www.w3.org/TR/html4/strict.dtd\">"
				+
				"<html xmlns=\"http://www.w3.org/1999/xhtml\" lang=\"en\">"
				+
				"<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"
				+
				"<title>Configuração</title>"
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
				"<h2 class=\"star\"><span>Formulários</span> </h2>"
				+
				"<input type=\"button\" id='novo' value=\"Novo\" />"
				+
				"<table class='tabela'>"
				+
						"<tr style=\" background-color: #EEE9E9; color:#000000 \">"
				+
						"<td style=\"width: 10%\"></td>"
				+
						"<td style=\"width: 50%\">Nome</td>"
				+
						"<td style=\"width: 20%\">Dados</td>"
				+
						"<td style=\"width: 20% \">Ultimo Envio</td>"
				+
						"</tr>"
				+	
				"<tr style=\" color:#000000 \">"
				+
				"<td></td>"
				+
				"<td> Formulário 1<div><a href=\"#\">Editar</a> <a href=\"#\">Excluir</a> <a href=\"#\">Dados</a></div></td>"
				+
						"<td> 30</td>"
				+
						"<td>07-05-2012</td>"
				+		
					"</tr>"
				+
					"<tr style=\"background-color: #EEE9E9; color:#000000\">"
				+
						"<td></td>"
				+
						"<td>Formulário 2<br><div><a href=\"#\"> Editar</a> <a href=\"#\">Excluir</a> <a href=\"#\">Dados</a></div></td>"
				+
						"<td>0</td>"
				+
						"<td></td>"
				+
					"</tr>"
				+
				"</table>"
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

}

GerenciadorDeRequisicao.prototype.gerenciarFormulario = function(request,response){
	var bd = new banco();
	var formulario;
	var sql;	
	// Formulário guarda as informações vindas por POST
	formulario = request.body.form;
	//console.log(request.body.form);
	data_atual = new Date();
	data_atual = data_atual.getFullYear()+'-'+data_atual.getMonth()+'-'+data_atual.getDay();
	sql = 'INSERT INTO formulario(nome,data_criacao) VALUES("'+ formulario['name'] +'","'+ data_atual +'")';
	
	for(var i in formulario){
		 if(formulario[i].tipo == undefined){
    		console.log('nao eh campo');
    	}else{
    		switch(formulario[i].tipo){
    			case 'texto':
    				
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
	//console.log(formulario);
    response.end();
}



module.exports = GerenciadorDeRequisicao;