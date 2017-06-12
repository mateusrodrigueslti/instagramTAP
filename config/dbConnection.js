var mongo = require("mongodb");
var mongoose = require('mongoose');
var url = "localhost";
var port = 27017;
const connection = mongoose.connect('mongodb://' + url + '/instagram');
// const connection = mongoose.connect('mongodb://shell:toor@cluster0-shard-00-00-dhpkf.mongodb.net:27017,cluster0-shard-00-01-dhpkf.mongodb.net:27017,cluster0-shard-00-02-dhpkf.mongodb.net:27017/socialmoments?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var connMongoDB = function() {
    return connection;
}

module.exports = function() {
    return connMongoDB;
}