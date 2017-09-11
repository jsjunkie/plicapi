var fs = require('fs');
var split = require('split2');
var through = require('through2');
var database = require('./database');

var upload = function(fileName, db, callback, errorCallback){
	var headerFields = [];
	var dataStream = fs.createReadStream(__dirname + '/uploads/' + fileName)
		.pipe(split())
		.pipe(through(function(buffer, encoding, next){

			if(headerFields.length === 0){
				headerFields = buffer.toString().split(",");
			} else {
				var fields = buffer.toString().split(",");

				var rowObj = headerFields.reduce(function(acc, curr, index){
					var newObj = {};
					newObj[curr] = fields[index];
					return Object.assign(acc, newObj); 
				}, {});

				this.push(JSON.stringify(rowObj));
			}

			next();
		}, function(done){
			done();
		}));
		//.pipe(process.stdout);

		dataStream.on('data', function(data){
			var entry = data.toString();
			database.addProduct(JSON.parse(entry), db, function(result){
				console.log("entry added")
			}, function(err){
				console.log(err);
			});
		});

		dataStream.on('error', function(err){
			console.log(err);
			errorCallback();
		})

		dataStream.on('end', function(){
			callback();
		})
}

module.exports = {
	upload: upload
}