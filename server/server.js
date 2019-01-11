var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  })
}, (e) => {
  res.status(400).send(e);
});

// GET /todos.12345
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      error: `Not Found: ID ${id} is Invalid`,
      status: 404
    });
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({
        error: `Not Found: ID ${id} is NOT in Dataset`,
        status: 404
      });
    }
    res.send({todo});
  })
}, (e) => {
  res.status(400).send(e);
});

app.delete('/todos/:id', (req,res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      error: `Unable to Delete, Not Found: ID ${id} is Invalid`,
      status: 404
    });
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send({
        error: `Unable to Deelete, Not Found: ID ${id} notin dataset`,
        status: 404
      });
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on .... wait for it .... port ${port}`);
});

module.exports = {app};
