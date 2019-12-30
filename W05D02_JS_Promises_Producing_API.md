<h1 id="summary">Summary</h1>

* [JavaScript Promises](#promises)
   * [What is a Promise?](#what-is-promise)
   * [Making Promises](#making-promises)
   * [Resolving Promises](#resolving-promises)
   * [Rejecting Promises](#rejecting-promises)
   * [Chaning Promises](#chaining)
   * [Example 1](#example-1)
   * [Example 2 - Seeding a Database](#example-2)
   * [References](#references)
* [Producing an API in Express](#producing-api)
  * [Why Expose API Access to an App?](#why-expose)
  * [Views not Required](#view-now)
  * [Postman](#postman)
  * [API RESTful Routes](#api-restful)
  * [Example - Puppies API](#example)

<h1 id="promises">JavaScript Promises</h1>

[Go Back to Summary](#summary)

* **Promises** prode an alternative to callbacks as a way to work with asynchronous code execution.
   * Accept a callback
   * Return a promise
   * Or do both (Mongoose queries are an exemple of this)

<h2 id="what-is-promise">What is a Promise?</h2>

[Go Back to Summary](#summary)

* A **promise** is a special JavaScript object
* A **promise** represents the eventual completion, or failure of an asynchronous operation.
* Although we usually consume promises returned by functions, we'll start by creating one so that we can see how they work.
* The advantage of promises is that they "flatten" the async flow and thus avoid the so-called pyramid of doom.

* Let's create a new promise

   ```JavaScript
      let newP = new Promise((resolve, reject) => {
         console.log((resolve, reject));
      });
      console.log(newP);
   ```

   * The executor is immediately called by the **promise** constructor passing functions as arguments for the `resolve` and `reject` parameters.
   * The promise created is an object with a `<pending>` state.

<h2 id="making-promises">Making Promises</h2>

[Go Back to Summary](#summary)

   * A **promise** is always in one of three states:
      * `pending`  : Initial state, neither fulfilled nor rejected.
      * `fulfilled`: The async operation completed successfully
      * `rejected` : The async opeartion failed.
   * Once a **promise** has been settled, i.e., it's no longer pending, its state will not change again.

<h2 id="resolving-promises">Resolving Promises</h2>

[Go Back to Summary](#summary)

* So, how does a promise become `fulfilled`?
   * By calling the `resolve` function:

   ```JavaScript
      let newP = new Promise((resolve, reject) => {
         let value = 42;
         resolve(value);
      });
   ```

   * The promise `newP`, has benn resolved with the value `42`.
   * Note that **promises can only be resolved with a single value**, however that value can be anything such as an object, etc.

* How do we get the value of a resolved promise?
   * By calling the promise's `then` method.

   ```JavaScript
      let newP = new Promise((resolve, reject) => {
         let value = 42;
         resolve(value);
      });
      newP.then((result) => {
         console.log(result);
      });
   ```

   * The `then` method will execute the callback as soon as the promise is resolved. BTW, you can call `then` multiple times to acces the value of a resolved promise.

* So far our code is synchronous, let's make it asynchronous:

   ```JavaScript
      let newP = new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve('Time out!');
         }, 5000);
      });
   ```

   * We're using `setTimeout` to create an asynchronous operation

<h2 id="rejecting-promises">Rejecting Promises</h2>

[Go Back to Summary](#summary)

* Now let's call the `reject` function instead of `resolve`:

   ```JavaScript
      let newP = new Promise((resolve, reject) => {
         setTimeout(() => {
            reject('Something went wrong!');
         }, 2000);
      });
   ```

   * After 2 seconds, we'll see a `UnhandledPromiseRejectionWarning: ...` eror.
   * Reading the error more closely reveals that we need a `.catch()` to handle the promise rejectio.

* Let's chain a `catch` method call:

   ```JavaScript
      newP.then((result) => {
         console.log(result);
      }).catch((err) => {
         console.log(err);
      });
   ```

![](https://i.imgur.com/B0nzUpC.png)

<h2 id="chaining">Chaining Promises</h2>

[Go Back to Summary](#summary)

* We can chain as many `.then` methods we want:


   ```JavaScript
      newP.then((result) => {
         console.log(result);
         return 42;
      })
      .then((result) => {
         console.log(result);
         return 'Done!'
      })
      .then((result) => {
         console.log(result);
      });
   ```

<h2 id="example-1">Example 1:</h2>

[Go Back to Summary](#summary)

   ```JavaScript
      //+ The function returns a promise that resolves to the result of adding two numbers after a delay (ms).
         function asyncAdd(a, b, delay) {
            return new Promise( (resolve) => {
               setTimeout(() => {
                  resolve(a + b);
               }, delay);
            });
         };

         asyncAdd(5, 10, 2000)
         .then((sum) => {
         console.log(sum);
         return asyncAdd(sum, 100, 1000);
         })
         .then((sum) => {
         console.log(sum);
         return asyncAdd(sum, 1000, 2000);
         })
         .then((sum) => {
         console.log(sum);
         });
   ```

   * More commonly though, we'll be consuming promises returned by libraries such as Mongoose...

<h2 id="example-2">Example 2 - Seeding a Database</h2>

[Go Back to Summary](#summary)

   * **Seeding** a database is the process of populating a database with some initial data.
   * At the top of `seed.js`, let's connect to the database, require the Models and load the `data` module:

   ```JavaScript
      // utility to initialize database
         require('./config/database');
         const Movie = require('./models/movie');
         const Performer = require('./models/performer');
         const data = require('./data');
   ```

   * To avoid duplicates when seeding a database, we first need to delete all data from the collections we'll be inserting data into.

   ```JavaScript
      // clear out all movies and performers to prevent dups
      Movie.deleteMany({})
      .then( (results) => {
         console.log(results);
         process.exit();
      });
   ```

* Most Mongoose Model methods return a "thenable" that works like a promise. That means we can chain the code to delete performers:
   
   ```JavaScript
      Movie.deleteMany({})
      .then( (results) => {
         console.log('Deleted movies: ', results);
         return Performer.deleteMany({});
      })
      .then( (results) => {
         console.log('Deleted performers:', results);
      })
      .then( () => {
         process.exit();
      });
   ```

   * The code first deletes movies, then afterwards, deletes the performers in series.
   * Because they are not dependent upon each other, it would be more efficient to perform both operations **simultaneously** - the `Promise.all` method can make this happen.

* `Promise.all` accepts an array of promises and returns a single promise in their place:

   ```JavaScript
      // clear out all movies and performers to prevent dups
      const p1 = Movie.deleteMany({});
      const p2 = Performer.deleteMany({});
      
      Promise.all([p1, p2])
      .then( (results) => {
         console.log(results);
      })
      .then( () => {
         process.exit();
      });
   ```

   * The above code now removes documents from the movies & performers colletions in **parallel**.

* Let's create some data, beginning with performers:

   ```JavaScript
      const p1 = Movie.deleteMany({});
      const p2 = Performer.deleteMany({});

      Promise.all([p1, p2])                              //+ Delete Movie and Performes at the same time
      .then((results) => {
         console.log(results);                              //- Console.log what have been deleted
         const p3 = Performer.create(data.performers);
         const p4 = Movie.create(data.movies);
         return Promise.all([p3, p4]);                   //+ Create Performes and Movie at the same time
      })
      .then((results) => {
         console.log(results);                              //- Console.lgo what have been created
      })
      .then( () => {
         process.exit();
      });
   ```

* Let's say we want to assign the performer, **Mark Hamill**, to the movie, **Star Wars - A New Hope**.
* The coe on the followin slide uses another `Promise.all` because we can't resolve more than one value.

   ```JavaScript
      const p1 = Movie.deleteMany({});
      const p2 = Performer.deleteMany({});

      Promise.all([p1, p2])                              //+ Delete Movie and Performes at the same time
      .then((results) => {
         console.log(results);                              //- Console.log what have been deleted
         const p3 = Performer.create(data.performers);
         const p4 = Movie.create(data.movies);
         return Promise.all([p3, p4]);                   //+ Create Performes and Movie at the same time
      })
      .then((results) => {
         console.log(results);                              //- Console.log what have been created
         return Promise.all([
            Performe.findOne({name: 'Mark Hamill'}),
            Movie.findOne({title: 'Star Wars - A New Hope'})
         ]);
      })
      .then((results) => {
         console.log(results)                               //- Console.log the result array
         const mark = results[0];                           //- Performer
         const starWars = results[1];                       //- Movie
         starWars.cast.push(mark);                          //- Push performer to movie's cast
         return starWars.save();                            //- Save the data
      })
      .then(() => {
         process.exit();
      });
   ```

<h2 id="references">References</h2>

[Go Back to Summary](#summary)

* [MDN - Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)


<h1 id="producing-api">Producing an API in Express</h1>

[Go Back to Summary](#summary)

<h2 id="why-expose">Why Expose API Access to an App?</h2>

* Earlier we made requests to third-party API endpoints. Now it's our turn to expose our own endpoints.
* Exposing an API our own app enables:
  * Development of single-page applications (no full-page refreshes).
  * Our app's RESTful resources and functionatily to be accessed by multiple front-ends (web, mobile and desktop).

<h2 id="view-not">Views not Required</h2>

[Go Back to Summary](#summary)

* Our app's API routes will return JSON, not HTML views.
* This being the case, views do not apply when developing an API.
* However, the very same app may send back HTML using views **and** send back JSON by exposing an API. They are not mutually exclusive.

<h2 id="postman">Postman</h2>

[Go Back to Summary](#summary)

* **[Postman](https://www.getpostman.com/downloads/)** enables us to make any type of HTTP request, including sending along a data payload.
* Postman can also be installed as a Chrome extension.

<h2 id="api-restful">API RESTful Routes</h2>

[Go Back to Summary](#summary)

* Setting our API's routes will be very simillar to how we've set up non-API routes.
* However, it's a best practice to "namespace" API related routes & code.

<h2 id="example">Exameple - Puppies API</h2>

[Go Back to Summary](#summary)


<h3>Installation</h3>

   ```bash
      npx express-generator -e
      npm i
      npm i mongoose
      npm i dotenv
      npm i cors
   ```

<h3 id="dotenv">Create .env File</h3>

* Create `.env` file in the main root. Inside the file add:
  
   ```JavaScript
      MONGO_URI='mongodb://localhost/puppies'
   ```
<h3>Create Files and Folders</h3>

```bash
   config/database.js
   
   controllers/api/puppiesAPIController.js
   
   models/puppySchema.js

   routes/api/index.js
   router/api/puppyAPIRouter.js
```

<h3>Rename app.js to sever.js</h3>

* Rename `app.js`
  * Rename `app.js` to `server.js`
  * Adjust `bin/wwww`
  
   ```JavaScript
      var app = require('../app');

      //To

      var app = require('../server');
   ```

* In `server.js`

   ```JavaScript
      require('dotenv').config();                         //! Dotenv
      require('./config/database');                       //! Connect DB

      const apiRouter = require('./routes/api');
      const cors = require('cors');
      
      app.use(cors());
      
      app.use('/', indexRouter);
      app.use('/api', apiRouter);                         //! API Middleware
      
   ```

* In `controllers/database.js`

   ```JavaScript
      //! Require Packages
         const mongoose = require('mongoose');

      //! Connct the database.js to a collections named 'Pupies'
         mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
         });

      //! Shorthand to mongoose.connection object
         const db = mongoose.connection;

      //! Check connection
         db.on('connected', function() {
            console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
         });
   ```

* In `models/puppySchema.js`

   ```JavaScript
      //! Require Packages
         const mongoose = require('mongoose');
         const Schema = mongoose.Schema;

      //! Pupies Schema
         let puppySchema = new Schema(
            {
               name: {
                  type: String,
                  required: true
               },
               breed: {
                  type: String,
                  default: 'Mixed'
               },
               age: {
                  type: Number,
                  default: 0
               }
            },
            {
               timestamps: true
            }
         );

      module.exports = mongoose.model('Puppy', puppySchema, 'puppies');
   ```

* In `routes/api/puppyAPIRouter.js`
  
   ```JavaScript
      const express = require('express');
      const router = express.Router();
      const puppiesCtrl = require('../../controllers/api/puppiesAPIController');

      router.get   ('/',    puppiesCtrl.index);
      router.get   ('/:id', puppiesCtrl.showOne);
      router.post  ('/',    puppiesCtrl.create);
      router.put   ('/:id', puppiesCtrl.update);
      router.delete('/:id', puppiesCtrl.delete);

      module.exports = router;
   ```

* In `routes/api/index.js`

   ```JavaScript
      //! Require Packages
         const express = require('express');
         const router = express.Router();

      //! Require Puppies Router
         const puppiesRouter = require('./puppyAPIRouter');

      //! API middleware
         router.use('/puppies', puppiesRouter);

      //! Export to Server.js
         module.exports = router;
   ```

<h3>Postman</h3>

* Get Request
	http://localhost:3000/api/puppies

* Post Request
	http://localhost:3000/api/puppies

   ```json
      {
         "name": "Yumi",
         "breed": "Jack Russell",
         "age": 2
      }
   ```

* Put Request
	http://localhost:3000/api/puppies/5e0947e11eeac9f29e3d9663

   ```json
      {
         "name": "Yumi Sakima",
         "breed": "Jack Russell Terrier",
         "age": 2
      }
   ```

* Delete Request
	http://localhost:3000/api/puppies/5e0947e11eeac9f29e3d9663


<h2 id="cors"><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">CORS</a><h2>

[Go Back to Summary](#summary)

* Browsers have a security mechanism that prevents JS from making a request for a source to a domain different from the one that the current web page was load from.
* The domain is made up of the **host** and **port**. Therefore, `localhost:3000` is considered a different domain than `localhost:8080`.
* To improve web applications, developers asked modern browser vendor to allow cross-origin requests and the **cross-origin resource sharing (CORS)** standard came to be.
* To enable access to our server's API by clients not from our server's domain, we need to enable CORS.
* We implement CORS in an Express app using middleware.

<h3 id="cors-installation">Installation</h3>

[Go Back to Summary](#summary)

`npm i cors`

* Mount the middleware in `server.js`

```JavaScript
   const cors = require('cors');
   ...
   var app = express();

   app.use(cors());
```
