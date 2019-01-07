//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
  if (err) {
    return console.log('Unable to connect to DB');
  }
  console.log('Connected to DB');

const db=client.db('TodoApp');

db.collection('Users').deleteMany(name: "Paul");

db.collection('Users').findOneAndDelete({
  _id: new ObjectID("5c32a91b83d277a8b5011d00")
}).then((results) => {
  console.log(JSON.stringify(results, undefined,2));
});
  //client.close();
});
