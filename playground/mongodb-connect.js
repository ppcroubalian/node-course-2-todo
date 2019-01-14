//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('process.env.MONGODB_URI', (err,client) => {
  if (err) {
    return console.log('Unable to connect to DB');
  }
  console.log('Connected to DB');
  const db=client.db('TodoApp');
db.collection('Todos').insertOne({
    text: 'Something to do',
    comnpleted: false
  }, (err,result) => {
    if (err){
      return console.log('Unable to save todo:', err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));

  });
  client.close();
});
