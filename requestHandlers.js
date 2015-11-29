var fs = require('fs');

function target(response){
	fs.readFile('C:/nodejs/test/content/index.html', function (err, html){
		if(err){
			response.writeHead(500, {'Content-Type': 'text/html'});
        	response.write(err.toString());
		}
		else {
			response.writeHead(200, {'Content-Type': 'text/html'})
			response.write(html);
		}
		response.end();
	})

}

exports.target = target;