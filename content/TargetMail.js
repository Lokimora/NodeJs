function getToken(clientId, clientSecret){
	var url = "https://target.my.com/api/v2/oauth2/token.json";
	var xhr = new XMLHttpRequest();

	var data = "grant_type=client_credentials&client_id="+clientId+"&client_secret="+clientSecret;


	xhr.open("POST", url, false);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("Access-Control-Allow-Origin", "*")

		
		
	var resp = xhr.send(data);

	if(resp && resp.status == 200){
		var jsonObj = JSON.parse(resp.responseText);

		var element = document.createElement("p");
		element.innerHTML(jsonObj.access_token);
		document.body.appendChild(element);
	}

}