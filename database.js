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

module.exports = {
	addProduct: addProduct,
	getProducts: getProducts
}