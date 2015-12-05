var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function getToken(codestring) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'gran_type' : 'client_credentials',
      'client_id': 'Ecf5LruvfcCP0tAR',
      'client_secret' : 'sFIpaQOhwXozzXCYU9cj9qnBNYe07n2viMrSGiZPYud73SJr7cdoNEicAXy3kIaJCTsKTh1prXpvFM9887RDQCa0tjzuuRLNF8iFOjukPIHp9IivvUBIul89MBknzvdP9031N7rj0y3pYqKJiKtoSHwd52N7Li3tGBjWr2CwuO0f8EMUYMoB4la4ElNS0kkk19KbXeiUdHgjJZKdzY2oP'
     
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'https://my.target.com/api/v2/oauth2/token.json',
      port: '80',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}

exports.getToken = getToken;