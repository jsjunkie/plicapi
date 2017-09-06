var express = require('express');

var app = express();

app.get('/', function(req, res) {
	console.log('call to /');
	res.send('This is plic api');
});

app.listen(process.env.PORT, function() {
	console.log('Listening on port :'+process.env.PORT);
});
