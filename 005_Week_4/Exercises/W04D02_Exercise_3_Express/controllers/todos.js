//!                                                                      ,,    ,,                            
//!                                           mm                       `7MM  `7MM                            
//!                                           MM                         MM    MM                            
//!           ,p6"bo   ,pW"Wq.  `7MMpMMMb.  mmMMmm  `7Mb,od8  ,pW"Wq.    MM    MM   .gP"Ya  `7Mb,od8 ,pP"Ybd 
//!          6M'  OO  6W'   `Wb   MM    MM    MM      MM' "' 6W'   `Wb   MM    MM  ,M'   Yb   MM' "' 8I   `" 
//!          8M       8M     M8   MM    MM    MM      MM     8M     M8   MM    MM  8M""""""   MM     `YMMMa. 
//!          YM.    , YA.   ,A9   MM    MM    MM      MM     YA.   ,A9   MM    MM  YM.    ,   MM     L.   I8 
//!           YMbmd'   `Ybmd9'  .JMML  JMML.  `Mbmo .JMML.    `Ybmd9'  .JMML..JMML. `Mbmmd' .JMML.   M9mmmP' 

const Todo = require('../models/todo');

const index = (req, res) => {
  console.log(req.query);
  3;
  res.render('todos/index', {
    todos: Todo.getAll(),
    reqTime: req.time
  });
};

const show = (req, res) => {
  const todo = Todo.getOne(req.params.id);
  if (todo) {
    res.render('todos/show', {
      todo,
      todoId: req.params.id,
      todoNum: parseInt(req.params.id) + 1
    });
  } else {
    res.redirect('/todos');
  }
};

const newTodo = (req, res) => {
  res.render('todos/new');
};

const create = (req, res) => {
  // req.body.done = false;
  // Todo.create(req.body);
  Todo.create(req.body.todo);
  res.redirect('/todos');
};

const deleteTodo = (req, res) => {
  Todo.deleteOne(req.params.id);
  res.redirect('/todos');
};

const edit = (req, res) => {
  const todo = Todo.getOne(req.params.id);
  if (todo) {
    res.render('todos/edit', {
      todo,
      todoId: req.params.id,
      todoNum: parseInt(req.params.id) + 1
    });
  } else {
    res.redirect('/todos');
  }
};

const update = (req, res) => {
  Todo.update(req.params.id, req.body);
  res.redirect('/todos/' + req.params.id);
};

module.exports = {
  index,
  show,
  new: newTodo,
  create,
  delete: deleteTodo,
  edit,
  update
};
