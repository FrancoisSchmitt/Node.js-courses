const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {

    mongoClient
			.connect(
				"mongodb+srv://schmittfrancois1699:cSypcNdWg69nRV3H@cluster-francois-schmit.32yl8et.mongodb.net/shop?retryWrites=true&w=majority")
			.then((client) => {
				console.log("connected");
				_db = client.db();
				callback();
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
}   

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database Found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;