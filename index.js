var express = require('express');
var app = express();
var fs = require('fs');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/'))

app.get('/', function(request, response) {
  response.sendfile('index.html');
})

app.listen(app.get('port'), function() {
  console.log('node app is up and running at localhost:' + app.get('port'))
})
