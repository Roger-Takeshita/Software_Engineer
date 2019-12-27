<h1 id="summary">Summary</h1>

* [Full-Stack Development](#full-stack)
* [Node.js](#nodejs)
  * [What is Node.js?](#what-is-node)
  * [Why the Enthusiams for Node.js?](#why-enthusiasm)
  * [Why is Node so performant?](#node-performance)
  * [Asynchronous Programming Model](#asynchronous)
  * [Node Modules](#modules)
* [NPM - Node Package Manager](#npm)
* [Epress Framework](#express) 
   * [Ways to Respond to a Request](#ways-respond)
   * [Rendering Views](#views)
   * [View Engine - EJS](#ejs)
   * [Dynamic Templating Using EJS](#templating)
   * [View .ejs](#view-ejs)
   * [Redirecting](#redirecting)

<h1 id="full-stack">Full-Stack Development</h1>

[Go Back to Summary](#summary)

## A full-stack developer:

* Is a developer who is comfortable working with both front-end and back-end technologies.
* Can create full-stack applications by writing code that runs in both a client, such as browser, and a web server.
* Will often specialize in front-end or back-end technologies.

## Client/Server Architecture

* The terms **client** and **server** can refer both a **physical device** (computer, tablet, phone, etc.) but can also refer to a **software process**. For example:
   * Database softwaresuch as PostgreSQL and web server like Apache are examples of software clients.
* Physical **servers** connected to the internet are also referred to as **host**
* We developers usually think of a "web browser" when hear "client".
* Note that durig development, your computer will plays the role of BOTH client and server.
* The PostgreSQL and MongoDB database servers will also be running on your computer, however, we will move to a cloud base MongoDB server as soon as it's pratical.

# HTTP

* **Hypertext Transfer Protocol (HTTP)** is an application-level network protocol that powers the communication across the World Wide Web.
* **HTTP is fundamental to web development** - regardless of which back-end or front-end web technology/framework is used.
* When a user interacts with an amazing **web application** we developed, it's **HTTP** that informs the **web application** what the **browser** wants and it's **HTTP** that delivers the goods from the server back to the browser.
* The process of a client sending a HTTP request, and server responding is known as the **HTTTP Request/Response Cycle**:

![](https://i.imgur.com/Iqsj9gF.png)

* When we browse to a website by typing in the address bar, this is what happens:

![](https://i.imgur.com/JDFHoZl.png)

* Whe the response is received by the client, that request/response cycle has ended and there will be no further HTTP communications unless another request is sent by the client.
* The fact that a connection is not maintained between the client and server makes HTTP a **stateless protocol**. In other words, the current request does not know what has been done in previous requests.

## Anatomy of a HTTP Response Message

* The [Status Code](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) alwyas has a three-digit numer that falls within the following range/categories:

   * 1xx informational
   * 2xx Sucess
   * 3xx Redirection
   * 4xx Client Error
   * 5xx Server Error

## The Two Key Components of a HTTP Request

* A HTTP request beggins with a request-line like this:

```html
      GET /sample_page.html HTTP/1.1
```

* The two key components of any HTTP request are:

   * The HTTP method (`GET` in the example above), and
   * The request target, which is usually a **URL**

## Methods

* [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), are used to indicate the desired **action** to be performed for a given resource (specified by the URL) on the server.
* The fact that they indicate **action** is why they are also at times called **HTTP Verbs**
* We'll be using the following HTTP methods when we start "designing" our application's routes.

| HTTP Method (Verb) | Desired Action on Server                                                                                                |
|--------------------|-------------------------------------------------------------------------------------------------------------------------|
| GET                | The GET method requests a representation of the specified resource (URL). Requests using GET should only retrieve data. |
| POST               | The POST method is used to create a resource on the server.                                                             |
| PATCH/PUT          | The PATCH/PUT method updates a resource with the request payload(data in the body).                                     |
| DELETE             | The DELETE method deletes the specified resource.                                                                       |

## URL

* **URL** stands for **Uniform Resource Locator**
* It informs the server of what resource the client want to GET, create (POST), DELETE, etc.

![](https://i.imgur.com/w1igQx0.png)



<h1 id="nodejs">Intro to Node.js</h1>

[Go Back to Summary](#summary)

<h2 id="what-is-node">What is Node.js?</h2>

[Go Back to Summary](#summary)

* Node.js is a runtime enviroment for executing JavaScript outside of the browser.
* Uses the same V8 JavaScript Engine used in the Chrome browser to compile JS programs into machine code.
* Node's runtime enviroment for JS is different than that in the browser, primarily because:
   * It doesn't have a browser's DOM or [Web API](https://developer.mozilla.org/en-US/docs/Web/API)
   * Node has low-level networking and file system API that browser JS doesn't (for security reasons).
* In addition to beging used to build high-performance web applications, Node is also a grate tool for building command-tools.
* Node is an open source project governed by the [Node.js Foundation](https://foundation.nodejs.org/) with board representation from companies such as:
   * PayPal
   * Microsoft
   * Google
   * GoDaddy
   * IBM
   * Red Hat
   * Intel
* Node is very "lightweight", i.e., only low-level "core" modules for networking, filesystem access, etc. are baked-in.
* Node's functionality is extented via open source libraries called packages.
* Node's package ecosystem is the largest open source ecosystem in the world.

<h2 id="node-repl">Node's REPL</h2>

[Go Back to Summary](#summary)

* **REPL** is an acronym for **Read-Evaluate-Print-Loop**
* Programming languages such as Python and Ruby also have REPLs.
* To start [Node's interactive REPL](https://nodejs.org/api/repl.html) we just type `node` in terminal.

<h2 id="why-enthusiasm">Why the Enthusiasm for Node.js?</h2>

[Go Back to Summary](#summary)

* First and foremost, **performance** - businesses can handle more traffic with less hardware!
* Secondly, developer **synergy**. Developers can use JavaScript on both client & server, thus becoming a full-stack dev is more obtainable and companies can better utilize their developer resources across the front and back-ends.
* The improvements in server performance and developer productivity result in **businesses saving money**.
* Businesses saving money results in wide adoption.
* Most importantly, wide adoption of Node.js results in strong demand for Node developers!

<h2 id="node-performance">Why is Node so performant?</h2>

[Go Back to Summary](#summary)

* First, it's important to understand how time consuming ("expensive") Input/Output operations are:

![](https://i.imgur.com/iXshhYh.jpg)

* Node's **Asynchronous / Event-driven** design enables **non-blocking** Input/Output:

![](https://i.imgur.com/ARbweHg.jpg)

* A typical Node server is capable of supporting tens of thousands of concurrent connections!
* For more information regarding perfomance, check the references at the end of this presentation.

<h2 id="asynchronous">Asynchronous Programming Model</h2>

[Go Back to Summary](#summary)

* High-performance, non-blocking I/O operations must be designed as asynchronous methods.
* Therefore, a Node developer will use callback functions and/or promises extensively.

<h2 id="modules">Node Modules</h2>

[Go Back to Summary](#summary)

* Modules in Node allow us to modularize and reuse code in a Node app.
* Node itself comes with several core modules, such as the `http` and `fs` modules.
* There are thousands of open-source modules available.
* In a Node application, **every** JavaScript file is a module!
* A Node app's modules (files) can be put in any folder within the project.
* This allows us to create modules inside of aptly named folders, such as `models`, `routes`, `controllers`, `views`, etc.
* A module is "loaded" into a Node app using the `require` function we just used to load the `fs` module.
* Whatever functionality the module "exports" is returned by the `require` function.
* Since modules are about code reuse, they can be required an unlimited number of times throughout the application.
* However, the code in the module **only runs the first time the module is required**.


* The property on `module` that we're really interested in though is `exports`. What value is it initialized to?
* Whatever value is assigned to `module.exports` within a module, is what the `require` function returns!



<h1 id="npm">NPM - Node Package Manager</h1>

[Go Back to Summary](#summary)

* Node uses a package management system to distribute open-source packages called Node Package Manager (npm).
* Usually a package distributes a Node module, however, sometimes the package distributes a CLI instead of a module we would use in our program.
* Node programs use a `package.json` file that tracks the installed modules that the app depends upon.
* Tracking an application's dependencies in `package.json` removes the necessity to push the app's node modules to the projects GitHub repo - this saves **MASSIVE** file storage and bandwidth.

* If you start a Node app from scratch, the first thing you should do is create the package.json file by entering the following command:

```bash
      npm init
```

* It's okay to accept all of the default settings. To accept the defaults without being prompted, you can run the command as follows:

```bash
      npm init -y
```

* There is now a `node_modules` folder that contains a folder for the `request` module and its many dependencies.
* There's also a new `package-lock.json` file that npm uses to track dependencies and unlike `package.json`, should not be edited.
* Note: it's highly recommended that `node_modules` be added to your `.gitignore` file.

```JavaScript
      // Don't specify path when module is in node_modules
      const request = require('request');
      request(
         'http://isitbeeroclock.com',
         (err, res, body) => {
            console.log(body);
         }
      );
```

* Note the first parameter in the callback is `err`.
* This "error-first" callback signature is prevalent throughout Node.

### References
   * [NodeJS Homepage](https://nodejs.org/)
   * [Node Package Manager](https://www.npmjs.com/)
   * [Blocking/Non-Blocking, Async/Sync](http://stackoverflow.com/questions/10570246/what-is-non-blocking-or-asynchronous-i-o-in-node-js)



<h1 id="express">Intro to the Express Framework for Node</h1>

[Go Back to Summary](#summary)

* 1) Create a `package.json` using the command:

```bash
         npm init
```
   * Accept the default, **except** for the **entry point** - set this to be "**server.js**"

## The Three Fundamental Capabilities of Web Application Frameworks

* Web application frameworks have three capabilities fundamental to writing a back-end web application:

   * The ability to define routes
   * The ability to process HTTP requests using middleware
   * The ability to use a view engine to render dynamic templates

* [Express](https://expressjs.com/) is the most popular web framework for Node.js.
* It is minimalistic and lightweight, especially when compared to massie frameworks like Django and Rails.
* Express uses Node's built-in HTTP module to listen for, and respond to, HTTP requests - Express simply adds those three web application capabalities on top of Node.

* 2) Install the Express Module

```bash
      npm i expres
```

* Create a `server.js` to put our web app's main code in:

```bash
      touch server.js
```

```JavaScript
      // Load express
      const express = require('express');

      // Create our express app
      const app = express();

      // Define a "root" route directly on app
      // Tomorrow, we'll use best practice routing
      app.get('/', (request, response) => {
         response.send('<h1>Hello World!</h1>');
      });

      // Tell the app to listen on port 3000
      // for HTTP requests from clients
      app.listen(3000, () => {
         console.log('Listening on port 3000');
      });
```

   * The `send` method is a general purpose way to respond to the request, however, soon we'll be using more specific methods.

* 3) Run the app

```bash
      node server
```

   * Browsing to `localhost:3000` will hit out app's root route that we defined and return "Hello World".

* 4) Nodemon

* `nodemon` is a popular development tool used for automatically restarting our Express app when we save changes.

```bash
      npm i -g nodemon
```
   * Command line tools are installed using the -g (global) option
* Now, thanks to the `main` key in `package.json`, we can start the server by simply typing `nodemon`.

* 5) First Route

```JavaScript
      // Mount routes
      app.get('/', (request, response) => {
         response.send('<h1>Hello Express</h1>');
      });
```

* Like most web frameworks, Express uses the `HTTP Method` and the `Path` of the HTTP request to match a route defined in the application.
* In our first route, we defined a route using the `get` method on the Express `app` object.
* The `get` method defines a route that listens for a `GET` request. There are other methods such as `post`, `put` and `delete`, that map to the other HTTP verbs.
* The first argument provided to `app.get`, `/`, defines the path for the route. In this case the root of the application, i.e., just the host name like `localhost:3000`.
* In Express, all strings used to define a path should start with a forward-slash character (`/`).
* In tomorrow's Express lesson, we'll learn a preferred way of defining routes using the Express `Router` object, but you need to be aware of defining routes this way as well.
* The second argument provided to `app.get()` is a callback function:

```Javascript
      app.get('/', (request, response) => {
         response.send('<h1>Hello Express</h1>');
      });
```
* Express will execute route's callback function only when a matching HTTP request (HTTP Method + Path) is received.
* The route's callback function defines two parameters: `request` and `response`
   * `request`: Represents Express's request object, and
   * `response`: Represents Express's response object
* Express provides those two objects as arguments when it invokes the callback.
* The `request` object has properties and methods used to access information regarding the current HTTP request, including any data being sent from the browser.
* The `response` object contains properties and methods used to end the request/response cycle - like we've done so far using the `response.send` method.

<h2 id="ways-respond">Ways to Respond to a Request<h2>

[Go Back to Summary](#summary)

* So far we have responded in our route handler (callback) code by using the `response.send` method.
* The [Express Docs for the Reponse Object](https://expressjs.com/en/4x/api.html#res) explains the other ways to respond to the HTTP request.
* Here are the methods we'll use the most:
   * `response.render()` - Render a view template and send the resulting HTML to the browser.
   * `response.redirect()` - Tell the browser to issue another `GET` request.
   * `response.json()` - Send a JSON response (used when we communicate via AJAX).

<h2 id="views">Rendering Views</h2>

[Go Back to Summary](#summary)

* Another of the three fundamental capabilities of a web framework is to be able to use a view engine to render templates.
* A template can include mixture of static HTML and "code" that generates HTML dynamically.
* In Express, we use `response.render` to process a template using a view engine and return the resulting HTML to the browser.
* Express can work with a multitude of view egines.
* [Pug](https://pugjs.org/api/getting-started.html) (formerly `Jade`) is a template language that leverages indentation to create HTML with a "shorthand" syntax.
* **Exprss applications are usually architeted using the MVC design pattern, so we will put all view templates inside of a `views` folder**
* `.ejs` is the file extension for the EJS view engine.

*Let's refactor the `GET/Home` route's callback to render our new `home.ejs` template:

```JavaScript
      app.get('/home', (request, response) => {
 	      response.render('home');
      });
```
   * Just the file name, not the `ejs` extension.

*  The `app.set` method is used to configure and Express app's settings

```JavaScript
      // Configure the app (app.set)
      app.set ("view engine", "ejs");
```

* We also need to tell Express **where** all of our views can be found:

```JavaScript
      // Configure the app (app.set)
      app.set('view engine', 'ejs');
      app.set('views', path.join(__dirname, 'views'));
```

   * `path.join` is just a Node method that builds a properly formatted path from segment strings passed to it. `__dirname` is always available and represent the path of the current folder where  the currently running code lives; and `views` is the name of the folder we created to hold our views.
   * `path` is a core Node module, but it still must be required before we can use it.

* Core Node modules don't have to be installed, but we do need to `require` them.

```JavaScript
   // Require modules
   const express = require('express');
   const path = require('path');
```

<h2 id="ejs">View Engine - EJS</h2>

[Go Back to Summary](#summary)

* We need to install EJS view engine package:

```JavaScript
      npm i ejs
```

   * We don't need to `require` the view engine - Express knows how to find it.

* View engines are used to dynamically generate HTML on the server before sending it to the client.
* We just used to `render` method, passing in the view name as an argument.
* We can also pass in a JavaScript **object** as a second argument, and all its properties will be accessible in the view within `ejs` tags.

<h3 id="templating">Dynamic Templating Using EJS</h3>

[Go Back to Summary](#summary)

* View engines are used to dynamically generate HTML, on the server before sending it to the cliente.
* We just use the `render` method, passing in the view name as an argument.
* We can also pass in a JavaScript **object** as a second argument, and all its properties will be accessible in the view within `ejs` tags.

<h3 id="view-ejs">View .ejs</h3>

[Go Back to Summary](#summary)

* Now let's code the `todos/index.ejs` view. Start by copying over the HTML from `home.ejs` and fix it up to look like this:

```HTML
      <body>
         <h1>Todos</h1>
         <ul>
         <% todos.forEach( (t) => { %>
            <li>
               <%= t.todo %>
               -
               <%= t.done ? 'done' : 'not done' %>
            </li>
         <% }); %>
         </ul>
      </body>
```

* The `<% %>` EJS tags are for executing JavaScript such as control flow.
* The `<%= %>` EJS tags are for writing JS expressions into the HTML page.

<h3 id="redirecting">Redirecting</h3>

[Go Back to Summary](#summary)

*Refactor the root route as follows:

```JavaScript
      app.get('/', (request, response) => {
         response.redirect('/home');
      });
```

 * Redirects tell the browser to make a new `GET` request to the provided `path`.
* when we start creating, updating, or deleting data, we will always perform a `redirect`.