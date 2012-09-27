/**
 * @author Hermes Luciano Monteiro Junior
 */
$(document).ready(function(){
// Executa o evento CLICK em todos os links do menu
 $('.sb_menu li a').live('click',function(){
  // Faz o carregamento da página de acordo com o COD da página, que vai pegar os valores da página page.php.
   
  $('#principal').load($(this).attr('href'));

  return false;
    
 });
  $('#novo').live('click',function(){
  // Faz o carregamento da página de acordo com o COD da página, que vai pegar os valores da página page.php.
   
  $('#principal').load('cadastro.html');

  return false;
    
 });
 
});