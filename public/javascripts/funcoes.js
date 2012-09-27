$(document).ready( function() {
	$("#formulario").validate({
		// Define as regras
		rules:{
			campoNomeProjeto:{
				
				required: true 
			},
			campoNomeClasse:{
				
				required: true
			},
			campoMensagem:{
				// campoMensagem será obrigatório (required) e terá tamanho mínimo (minLength)
				required: true
			}
		},
		// Define as mensagens de erro para cada regra
		messages:{
			campoNomeProjeto:{
				required: "Digite o nome do projeto",
				minLength: "O seu nome deve conter, no mínimo, 2 caracteres"
			},
			campoNomeClasse:{
				required: "Digite um nome para a classe"
				
			},
			campoMensagem:{
				required: "Digite a sua mensagem",
				minLength: "A sua mensagem deve conter, no mínimo, 2 caracteres"
			},
			validar:{
				required: "É obrigatório o preenchimento deste campo."
			}
		}
	});
	
	
	
	
	
	
});
