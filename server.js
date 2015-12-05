var mongoose = require('mongoose');
var assert = require('assert');
var path = require('path');
var request = require('request');
var target = require('./target');
var querystring = require('querystring');
var express = require('express');
var bodyParser = require('body-parser');
var mongoGreen = require('./mongoGreen');


var app = express();

app.use(express.static(path.join(__dirname, 'content')));
app.use(bodyParser.urlencoded({extended:false}));


  

var getLastToken =  function(callback){
    var qeury = mongoGreen.tokenDB.findOne({'TokenType' : 0}, {}, { sort: {'ReceivingDate' : -1}}, (function(err, res){
        if(err) console.log(err);
        callback(res);
     }));
}


app.get('/api/target/authorize', function(req, resp){
        getLastToken(function(dbToken){
            token = dbToken.AccessToken;
            
            if(token){
                var tokenDate =  Date.parse(dbToken.ReceivingDate);
                var currentDate = Date.parse(new Date());
                var hours = Math.abs(currentDate - tokenDate) / 36e5;
                
                if(hours < 24){
                    resp.setHeader('Content-Type', 'application/json');
                    resp.send(dbToken);   
                }else{
                  /*  request.post(
                        'https://target.my.com/api/v2/oauth2/token.json', 
                        {form: {grant_type: 'client_credentials', client_id: clientId, client_secret : clientSecret}},
                        function(error, response, body){
                            if(!error && response.statusCode == 200){
                                resp.setHeader('Content-Type', 'application/json');
                                resp.send(body);
                            }else {
                                resp.writeHead(response.statusCode.toString(), {'Content-Type' : 'text/plain'}); 
                                resp.end(); 
                            }
                        });*/
                    resp.writeHead(500, {'Content-Type' : 'text/plain'});
                    resp.write("Токен не найден");
                    resp.end();
                }
            }
        });
});




app.get('/api/target/getPackages', function(req, resp){
    var token = req.headers['authorization'];

    if(token){

    request({
        headers: {
            'Authorization': token
        },
        uri: 'https://target.my.com/api/v1/packages.json',
        method: 'GET'
        }, function(error, response, body){
            if(!error && response.statusCode == 200){
                    resp.setHeader('Content-Type', 'application/json');
                    resp.send(body);
                }else {
                    resp.writeHead(response.statusCode.toString(), {'Content-Type' : 'text/plain'});
                    resp.write(body);
                    resp.end();
                }
            });
}else {
    resp.writeHead('401', {'Content-Type':'text/plain'});
    resp.write('Authorization header is not find')
    resp.end();
}
});





app.listen(9999);
console.log("Server is listen on 9999 port")


