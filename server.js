var express = require('express');
var cors = require('cors');
var MongoClient = require('mongodb');
var ObjectID = MongoClient.ObjectID; 
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var uploadFile =  require('./upload');
var database = require('./database');

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

app.post('/upload', upload.single('file'), function(req, res, next) {
	var file = req.file;
	uploadFile.upload(file.filename, db, function(){
		res.send("File has been uploaded");
	}, function(){
		res.send("There was some error");
	});

	console.log('call to /upload');
});

app.get('/mainlist', function(req, res){
	database.getProducts(db, function(data){
		res.send(JSON.stringify(data));
	}, function(err){
		console.log(err);
	})
});

app.get('/addtoamazon/:id', function(req, res, next){
	debugger;
	var id = ObjectID(req.params.id);
	database.addToAmazon(db, id, function(result){
		res.send("Product add to Amazon");
	}, function(err){
		console.log(err);
	});
});

app.get('/amazonlist', function(req, res) {
	database.getAmazonProducts(db, function(data){
		res.send(JSON.stringify(data));
	}, function(err){
		console.log(err);
	})
});

app.get('/removefromamazon/:id', function(req, res) {
	var id = ObjectID(req.params.id);
	database.removeFromAmazon(db, id, function(result){
		res.send("Product removed from Amazon");
	}, function(err){
		console.log(err);
	});
})

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
