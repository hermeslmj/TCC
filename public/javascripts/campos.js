var num_campos = 0;

function campoTexto(pai){
	var campo = "<div class=campo id=texto_"+num_campos+"><table>"
					+
				"<tr>Campo Texto </tr>"
				    +
				""    	
					+
				"<tr><td>Marcador:</td><td><input type=text name = campo"+num_campos+"[marcador] /></td></tr>"	
					+
				"<tr><td>Tamanho Máximo:</td><td><input type=text name = campo"+num_campos+"[comprimento] /></td></tr>"
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = campo"+num_campos+"[obrigatorio] /></td></tr>"	
					+
				"<tr><td>Validação:</td><td><select name= campo"+num_campos+"[validacao]>"
					+
				"<option>...</option>"
					+
				"<option>Somente Números</option>"
					+
				"<option>Número de telefone/celular</option>"
					+
				"<option>Email</option>"
					+
				"<option>CPF</option>"
					+
				"<option>Data</option>"	
					+				
				"</select></td></tr>"	
					+
				"</table><input align='right' value='Remover' type='button' onclick=$('#texto_"+num_campos+"').remove();><hr></div>";
					
					
	$(campo).appendTo('#'+pai);
}

function campoAreaTexto(pai){
	var campo = "<div class=campo id=areatexto_"+num_campos+"><table>"
					+
				"<tr>Área de Texto </tr>"
				    +
				""    	
					+
				"<tr><td>Marcador:</td><td><input type=text name = campo"+num_campos+"[marcador] /></td></tr>"	
				
					+
				"<tr><td>Largura</td><td><input type=text name = campo"+num_campos+"[largura] /></td></tr>"	
					+
				"<tr><td>Altura</td><td><input type=text name = campo"+num_campos+"[altura] /></td></tr>"
					+
				
				"<tr><td>Obrigatório</td><td><input type=checkbox name = campo"+num_campos+"[obrigatorio_areatexto] /></td></tr>"
					+
				"</table><input align='right' value='Remover' type='button' onclick=$('#areatexto_"+num_campos+"').remove();><hr></div>";
					
					
	$(campo).appendTo('#'+pai);
}

function campoUpload(pai){
		var campo = "<div class=campo id=upload_"+num_campos+"><table>"
					+
				"<tr>Upload de arquivo </tr>"
				    +
				
				"<tr><td>Marcador:</td><td><input type=text name = campo"+num_campos+"[marcador] /></td></tr>"	
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = campo"+num_campos+"[obrigatorio_upload] /></td></tr>"
					+
				"</table><input align='right' value='Remover' type='button' onclick=$('#upload_"+num_campos+"').remove();><hr></div>";
					
					
	$(campo).appendTo('#'+pai);
}

function campoLista(pai){
	var campo = "<div class=campo id=lista_"+num_campos+"><table>"
					+
				"<tr>Lista </tr>"
					+
				"<tr><td>Marcador:</td><td><input type=text name = campo"+num_campos+"[marcador] /></td></tr>"
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = campo"+num_campos+"[obrigatorio_lista] /></td></tr>"
					+
				"<tr><td>Opções(Digite as opções da lista separadas por vírgula)</td><td><input type = text name = campo"+num_campos+"[opcoes_lista] /></td></tr>"
					+	
				"</table><input align='right' value='Remover' type='button' onclick=$('#lista_"+num_campos+"').remove();><hr></div>";
	$(campo).appendTo('#'+pai);	
				
}

function campoCaixaDeMarcacao(pai){
	var campo = "<div class=campo id=caixa_"+num_campos+"><table>"
					+
				"<tr>Caixa de Marcação </tr>"
					+
				"<tr><td>Marcador:</td><td><input type=text name = campo"+num_campos+"[marcador] /></td></tr>"
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = campo"+num_campos+"[obrigatorio_caixa] /></td></tr>"
					+
				"<td>Opção única:</td><td><input type=radio value = unica name= campo"+num_campos+"[caixa_tipo] /></td><td>Opções multiplas</td><td><input type=radio value = multi name=caixa_tipo_" + num_campos + " /></td>"
					+
				"<tr><td>Opções(Digite as opções da caixa separadas por vírgula)</td><td><input type = text name = campo"+num_campos+"[opcoes_caixa] /></td></tr>"
					+	
				"</table><input align='right' value='Remover' type='button' onclick=$('#caixa_"+num_campos+"').remove();><hr></div>";
			$(campo).appendTo('#'+pai);	
				
}

function adicionaCampo( pai,  tipo){
	
	num_campos++;
	switch(tipo){
		case 'texto':
			campoTexto(pai);
		break;
		case 'area':
			campoAreaTexto(pai);
		break;
		case 'up':
			campoUpload(pai);
		break;
		case 'lista':
			campoLista(pai);
		break;
		case 'caixa':
			campoCaixaDeMarcacao(pai);
		break;
	}	

}







