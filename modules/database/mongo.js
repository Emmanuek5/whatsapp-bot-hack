const MongoClient = require("mongodb").MongoClient;

var url = "mongodb://0.0.0.0:3000/mydb";
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});


exports.startdb = function startdb(params) {
console.log("Db Starteds")   


}