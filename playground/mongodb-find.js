//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
  if (err) {
    return console.log('Unable to connect to DB');
  }
  console.log('Connected to DB');
  const db=client.db('TodoApp');

db.collection('Users').find({name: 'Paul'}).toArray().then((docs)=> {
  console.log('Users');
  console.log(JSON.stringify(docs,undefined,2));
}, (err) => {
  console.log('Undable to fetch todos', err);
});
  client.close();
});
