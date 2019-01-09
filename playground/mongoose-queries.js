const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');

var id = '5c355fc0b26d1a0ed02eebeb';

if (!ObjectID.isValid(id)) {
  return console.log("Invalid Todo ID");
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log("\n\nsearching for ID");
  if (!todos) {
    return console.log('IDs not found');
  }
  console.log('Todos', todos);
});


Todo.findOne({
  _id: id
}).then((todo) => {
  console.log("\n\nfindOne for ID");
  if (!todo) {
    return console.log('ID not found');
  }
  console.log('Todo', todo);
});


Todo.findById(id).then((todo) => {
  console.log("\n\nfindById for ID");
if (!todo) {
  return console.log('ID not found');
}
  console.log('Todo by ID', todo);
}).catch((e) => console.log(e));
