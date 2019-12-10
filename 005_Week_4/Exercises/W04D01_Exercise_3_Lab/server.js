//! Setup
//+ npm init
//+ npm i express
//+ npm i ejs
//- require("express")
   //- crete a variable to attach an object
//- require("path")

//? Add modules
   const express = require("express");
   const path = require("path");
   const dataBase = require("./data/students-db");

//? Create the express app
   const app = express();

//? Configure the app (app.set)
   app.set('view engine', 'ejs');
   app.set('views', path.join(__dirname, 'views'));

//? Mount routers
   //> Redirect the main website to folder /home
      app.get('/', (request, response) => {
         // response.sendFile(path.join(__dirname, 'public', 'index.html'))
         response.redirect('/home');
      });

   //> Render the Home.ejs page, from folder ./home
      app.get("/home", (request, response) => {
         response.render("home");
      });

   //> Render the index.ejs (students) page and load attach the data base to students variable.
      app.get("/students", (request, response) => {
         response.render("students/index", {
            students: dataBase.getAll()
         });
      });
   
   //> Get student id
      app.get('/students/:id', (request, response) => {
         console.log(`The value for the :id route parameter is: ${request.params.id}`);
         response.render('students/show', {
            student: dataBase.getOne(request.params.id)
         });
      });

//? Tell the app to listen on port 3000
   app.listen(3000, () => {
      console.log("Listening on port 3000");
   })