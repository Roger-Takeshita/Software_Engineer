const todos = [
  { todo: 'Feed Dogs', done: true }, // id: 'a1' },
  { todo: 'Learn Express', done: false }, // id: 'a2' },
  { todo: 'Buy Milk', done: false } // id: 'a3' }
];

function getAll() {
  return todos;
}

function getOne(id) {
  return todos[id];
  // return todos.find(todo => todo.id === id);
}

function create(todo) {
  // todos.push(todo);
  todos.push({ todo, done: false });
}

function deleteOne(id) {
  todos.splice(id, 1);
}

function update(id, todo) {
  todos[id] = todo;
}

module.exports = {
  getAll,
  getOne,
  create,
  deleteOne,
  update
};
