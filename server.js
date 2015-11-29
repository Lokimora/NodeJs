var path = require('path');
var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({credentials: true, origin: true}));


app.use(express.static(path.join(__dirname, 'content')));


app.get("/target", function(req, res){
	res.sendFile(__dirname+ '/content/index.html');
});

app.listen(8888);
console.log("Server is listen on 8888 port")


