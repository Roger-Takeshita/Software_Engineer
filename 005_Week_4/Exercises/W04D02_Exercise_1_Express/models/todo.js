const todos = [
   { todo: 'Feed Dogs', done: true , id: "a1"},
   { todo: 'Learn Express', done: false, id: "a2" },
   { todo: 'Buy Milk', done: false, id: "a3"}
];

const getAll = () => {
   return todos;
}

function getOne (id) {
   return todos[id];
}

module.exports = {
   getAll,
   getOne
};