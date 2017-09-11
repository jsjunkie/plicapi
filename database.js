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

module.exports = {
	addProduct: addProduct
}