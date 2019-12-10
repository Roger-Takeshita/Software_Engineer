const express = require("express");
const path = require("path");
const todoDb = require('./data/todo-db');

const app = express();

//- App Config -> Configuring the internals of the express
   app.set("view engine", ".ejs");
   app.set("views", path.join(__dirname, "views")); //? path is an internal node of npm, but still need to require

//- 1st - Mount middleware (most of the requests, middleware starts first)

//- 2nd - Mount routers -> "/" root route, home page
   // app.get("/", function(req, res) {
   //    console.log("Request made to HOME");
   //    res.send("<h1>Hello Express</h1>");
   // });

   app.get("/", function(req, res) {
      console.log("Request made to HOME");
      res.redirect("/home");
   });

   app.get("/home", (req, res) => {
      res.render("home")
   })

   app.get('/todos', (request, res) => {
      res.render('todos/index', {
         todos: todoDb.getAll()
      });
   });

   app.listen(3000, function() {
      console.log("listening to port 3000");
   })


//+ nodemon server.js (nodemon is a nodeserver that automatically updates my server stop/re-start)