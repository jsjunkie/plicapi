var express = require('express');
var cors = require('cors');
var MongoClient = require('mongodb');
var ObjectID = MongoClient.ObjectID; 

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

var db;

MongoClient.connect(process.env.MONGO_URI, function(err, database) {
	if (err){
	  console.log(err);
	  process.exit(1);
	}

	db = database;
	console.log('Connected to database');
	
	app.listen(process.env.PORT, function() {
   	     console.log('Listening on port :'+process.env.PORT);
	});
});
