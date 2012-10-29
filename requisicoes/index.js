var arquivos = require('../arquivos');
var controle = require('../configuracao/controle');	

function GerenciadorDeRequisicao(){
	this.GerenciadorDeArquivos = new arquivos();
	this.controleDeConfiguracao = new controle();
}

/*Configuração*/


GerenciadorDeRequisicao.prototype.configuracao = function(request,response){
	/*
	 
	 div.main
 div.header
  div.header_resize
   div.menu_nav
   div.logo
    h1
     a(href="#") Gerenciador de Formulários
      small Mais simples impossível
   div.crl
 div.content
  div.content_resize
   div.mainbar
    div.article#principal
     h2.star
      span #{title}
     p Bem vindo ao gerenciador de formulários. Se a primeira vez que você usa está ferramenta clique 
      a(href='doc.html') aqui 
      para ter acesso a documentação.
   div.sidebar
    div.gadget
     h2.star
      span Menu Lateral
     div.clr
     ul.sb_menu
      li: a(href='formularios.html') Formulários
      li: a(href='configuracao') Configurações
      li: a(href='doc.html') Documentação
 div.clr
 div.fbg
  div.fbg_resize
   div.col.c1
   div.col.c2
   div.col.c3
   div.clr
 div.footer
  div.footer_resive
   div.clr

    
    
    
   */
	
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
				"<form method=\"post\" action=\"/configuracao\">"
				
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
				"<input type=\"text\" name=\"banco[nome]\" />"
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
				"<input type=\"text\" name=\"banco[usuario]\"  />"
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
				"<input type=\"password\" name=\"banco[senha]\"  />"
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
				"<li><a>Formulários</a></li>"
				+
				"<li><a>Configuração</a></li>"
				+
				"<li><a>Documentação</a></li>"
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
				"</div>"
				
				+
				"</body>"
				+
				"</html>";
				console.log(html);
	response.write(html);
	response.end();
}

GerenciadorDeRequisicao.prototype.gerenciarConfiguracao = function(request,response){
		
	var conf = request.body;
	
	console.log(conf);
	if(this.GerenciadorDeArquivos.existeArquivo('./arquivos/configuracao.json')){
		this.controleDeConfiguracao.editarConfiguracao(conf.banco['usuario'],conf.banco['senha'],'localhost',conf.banco['nome']);
		console.log('velha');
	}else{
		console.log('nova');
		this.controleDeConfiguracao.novaConfiguracao(conf.banco['usuario'],conf.banco['senha'],'localhost',conf.banco['nome']);	
	}

}


/*Formulário*/
GerenciadorDeRequisicao.prototype.formulario = function(request,response){
	console.log('FORMULARIO');
}

module.exports = GerenciadorDeRequisicao;