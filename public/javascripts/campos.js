var num_campos = 0;

function campoTexto(pai){
	var campo = "<div class=campo id=texto_"+num_campos+"><table>"
					+
				"<tr>Campo Texto </tr>"
				    +
				""    	
					+
				"<tr><td>Marcador:</td><td><input type=text name = marcador_" + num_campos  + "/></td></tr>"	
					+
				"<tr><td>Tamanho Máximo:</td><td><input type=text name = comprimento_texto_" + num_campos  + "/></td></tr>"
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = obrigatorio_texto_" + num_campos  + "  /></td></tr>"	
					+
				"<tr><td>Validação:</td><td><select>"
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
				"<tr><td>Marcador:</td><td><input type=text name = marcador_" + num_campos  + "/></td></tr>"	
				
					+
				"<tr><td>Largura</td><td><input type=text name = largura_areatexto_" + num_campos  + "  /></td></tr>"	
					+
				"<tr><td>Altura</td><td><input type=text name = altura_areatexto_" + num_campos  + "  /></td></tr>"
					+
				
				"<tr><td>Obrigatório</td><td><input type=checkbox name = obrigatorio_areatexto_" + num_campos  + "  /></td></tr>"
					+
				"</table><input align='right' value='Remover' type='button' onclick=$('#areatexto_"+num_campos+"').remove();><hr></div>";
					
					
	$(campo).appendTo('#'+pai);
}

function campoUpload(pai){
		var campo = "<div class=campo id=upload_"+num_campos+"><table>"
					+
				"<tr>Upload de arquivo </tr>"
				    +
				
				"<tr><td>Marcador:</td><td><input type=text name = marcador_" + num_campos  + "/></td></tr>"	
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = obrigatorio_upload_" + num_campos  + "  /></td></tr>"
					+
				"</table><input align='right' value='Remover' type='button' onclick=$('#upload_"+num_campos+"').remove();><hr></div>";
					
					
	$(campo).appendTo('#'+pai);
}

function campoLista(pai){
	var campo = "<div class=campo id=lista_"+num_campos+"><table>"
					+
				"<tr>Lista </tr>"
					+
				"<tr><td>Marcador:</td><td><input type=text name = marcador_" + num_campos  + "/></td></tr>"
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = obrigatorio_lista_" + num_campos  + "  /></td></tr>"
					+
				"<tr><td>Opções(Digite as opções da lista separadas por vírgula)</td><td><input type = text name = opcoes_lista_" + num_campos + " /></td></tr>"
					+	
				"</table><input align='right' value='Remover' type='button' onclick=$('#lista_"+num_campos+"').remove();><hr></div>";
	$(campo).appendTo('#'+pai);	
				
}

function campoCaixaDeMarcacao(pai){
	var campo = "<div class=campo id=caixa_"+num_campos+"><table>"
					+
				"<tr>Caixa de Marcação </tr>"
					+
				"<tr><td>Marcador:</td><td><input type=text name = marcador_" + num_campos  + "/></td></tr>"
					+
				"<tr><td>Obrigatório</td><td><input type=checkbox name = obrigatorio_caixa_" + num_campos  + "  /></td></tr>"
					+
				"<td>Opção única:</td><td><input type=radio value = unica name= caixa_tipo_" + num_campos + " /></td><td>Opções multiplas</td><td><input type=radio value = multi name=caixa_tipo_" + num_campos + " /></td>"
					+
				"<tr><td>Opções(Digite as opções da caixa separadas por vírgula)</td><td><input type = text name = opcoes_caixa_" + num_campos + " /></td></tr>"
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







