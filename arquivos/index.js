var fs = require('fs');

exports.learquivo = function(caminho){

	return fs.readFileSync(caminho,'utf-8');
		
}






