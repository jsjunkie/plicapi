var express = require('express');
var cors = require('cors');

var app = express();
var corsOptions = {
	origin: process.env.ALLOW_ORI,
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/', function(req, res) {
	console.log('call to /');
	res.send('This is plic api');
});

app.listen(process.env.PORT, function() {
	console.log('Listening on port :'+process.env.PORT);
});
