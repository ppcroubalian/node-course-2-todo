//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
  if (err) {
    return console.log('Unable to connect to DB');
  }
  console.log('Connected to DB');

const db=client.db('TodoApp');

db.collection('Users').findOneAndUpdate( {
  _id: new ObjectID("5c32a91b83d277a8b5011d00"),
}, {
  $set: { location: "Venice"},
  $inc: {age:-5}
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

  //client.close();
});
