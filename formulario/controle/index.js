/*	
	var bd = new banco();
	var formulario;
	var sql;	
	var configuracao;
	
	// Formulário guarda as informações vindas por POST
	formulario = request.body.form;
	//console.log(request.body.form);
	data_atual = new Date();
	data_atual = data_atual.getFullYear()+'-'+data_atual.getMonth()+'-'+data_atual.getDay();
	
	sql = 'INSERT INTO formulario(nome,data_criacao) VALUES("'+ formulario['name'] +'","'+ data_atual +'")';
	
	configuracao = this.controleDeConfiguracao.retornaConfiguracao();
	
	bd.conect(configuracao.user,configuracao.password,configuracao.host,configuracao.db);	
	
	bd.insert(sql);
	
	
	
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
*/
var moduloModeloFormulario = require("../modelo");

function ControleFormulario(){
	this.modeloFormulario = new moduloModeloFormulario();
}

ControleFormulario.prototype.novoFormulario = function(request,response){
		
	
	// Formulário guarda as informações vindas por POST
	formulario = request.body.form;
	//console.log(request.body.form);
	this.modeloFormulario.inserir(formulario)
	
	

	
}

module.exports = ControleFormulario;

