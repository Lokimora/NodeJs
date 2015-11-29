function route(handle, pathname, response){
	if(typeof handle[pathname] === 'function'){
	    response.setHeader("Access-Control-Allow-Origin", "*");
		return handle[pathname](response);
	}
	else {
		console.log("No path for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not Found");
		response.end();
	}
}

exports.route = route;