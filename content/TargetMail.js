function getToken(clientId, clientSecret, callback){
	var xhr = new XMLHttpRequest();


	xhr.open("GET", '/api/target/authorize', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	
	xhr.onreadystatechange = function(){
		if(xhr.readyState != 4) return;

		callback(xhr);
	};


	xhr.send();
};

function getPackages(token, callback){
	var xhr = new XMLHttpRequest();

	xhr.open("GET", 'api/target/getPackages', true);
	xhr.setRequestHeader("Authorization", "Bearer " + token);

	xhr.onreadystatechange = function(){
		if(xhr.readyState != 4) return;

		callback(xhr);
	}	

	xhr.send();
}