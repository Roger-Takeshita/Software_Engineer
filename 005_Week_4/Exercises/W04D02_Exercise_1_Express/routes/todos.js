let express = require('express');
let router = express.Router();

// let Todo = require("../models/todo");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render("todos/index", {
//     todos: Todo.getAll()
//   })
// });

const todoCtrl = require("../controllers/todos");
router.get("/", todoCtrl.index);
router.get("/:id", todoCtrl.show);

module.exports = router;
