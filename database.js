var addProduct = function(entry, db, callback, errorCallback){
	var collection = db.collection("MainList");

	collection.insert(entry, function(err, result){
		if (err){
			errorCallback(err);
			return;
		}

		callback(result);
	});
}

var getProducts = function(db, callback, errorCallback){
	var collection = db.collection('MainList');

	collection.find({}).toArray(function(err, data){
		if (err){
			errorCallback(err);
			return;
		}

		callback(data);
	});
}

var addToAmazon = function(db, id, callback, errorCallback){
	var collection = db.collection("MainList");

	collection.updateOne({_id: id}, {$set: {amazon: true}}, function(err, result){
		if (err) {
			errorCallback(err);
			return;
		}

		callback(result);
	})
}

var getAmazonProducts = function(db, callback, errorCallback){
	var collection = db.collection('MainList');

	collection.find({amazon: true}).toArray(function(err, data){
		if (err){
			errorCallback(err);
			return;
		}

		callback(data);
	});
}

var removeFromAmazon = function(db, id, callback, errorCallback){
	var collection = db.collection("MainList");

	collection.updateOne({_id: id}, {$set: {amazon: false}}, function(err, result){
		if (err) {
			errorCallback(err);
			return;
		}

		callback(result);
	})
}

module.exports = {
	addProduct: addProduct,
	getProducts: getProducts,
	addToAmazon: addToAmazon,
	getAmazonProducts: getAmazonProducts,
	removeFromAmazon: removeFromAmazon
}