var env = process.env.NODE_ENV  || 'development';
//var env = process.env;
console.log('env ***', env);
if(env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoApp';
} else if(env==='test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoAppTest';
}

//console.log('env ***', env);

const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
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

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({
      error: `ID Not Found: ${id} is Invalid`,
      status: 404
    });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    bodyCompletedAt = null;
  }
  Todo.findOneAndUpdate(id, {$set: body}, {new:true}).then((todo) => {
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

var port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on .... wait for it .... port ${port}`);
});

module.exports = {app};
