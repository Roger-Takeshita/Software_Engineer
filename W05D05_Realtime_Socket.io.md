<h1 id='summary'>Summary</h1>

* [Socket.io](#socket)
  * [Intro to Socket.io](#intro)
    * [Basic Structure](#basic)
    * [What Are Messages?](#messages)
* [Example 1 - Realtime Circles](#example-1)
  * [Installation](#installation)
  * [Configure the Server](#config-server)
  * [Configure the Client](#config-client)
  * [Code Logic](#logic)
  * [Displaying Circles in Realtime](#displaying)
    * [Displaying Circles - Server Code](#displaying-server)
    * [Displaying Circles - Client Code](#displaying-client)
  * [Recap](#recap)
  * [Finish app.js - Client Code](#finish-app)
* [Example 2 - Realtime Circles and Players](#example-2)

<h1 id='socket'>Socket.io</h1>

<h2 id='intro'>Intro to Socket.io</h2>

<h3 id='basic'>Basic Structure</h3>

[Go Back to Summary](#summary)

* From the beginning, HTTP implemented a request | reponse process.
* In HTTP, all communications is initiated by the cient.
* The web server responds **once** to the client's request, and the "conversation" ends until client send another request.
* The HTML5 specifications also included the ability to **updagrade** a HTTP connection upon request of the client.
* This connections upgrade results in the switch to a protocol that supports bidirectional communication - the **websocket** protocol.
* Working with websockets natively is not terribly difficult, however, we've learned that using libraries such as `jQuery` can make us more productive developers.
* **socket.io** is a JavaScript library that wraps the websocket protocol an makes it easier to implement the realtime, bidirectional communication.

   ![](https://i.imgur.com/Y5EnZR3.png)

*  socket.io **clients and servers** send **messages** to each other
*  and both **clients and servers** can listen and react to those **messages**.

<h3 id='messages'>What Are Messages?</h3>

[Go Back to Summary](#summary)

* socket.io is all about sending and responding to **messages**.
* A **message** is a simple string identifier that **we** get to define, for example:
  * `login`, or `move-player`
* Just like when naming functions, it's best to use identifiers for our messages that reflect their purpose.
* What sending a message, we can optionally send data that will be received by the listeners for the message. For example, when sending a `login` message, we might send the following JS object:

   ```JavaScript
      {
         email: 'user@email.com',
         password: 'abc123'
      }
   ```

<h1 id='example-1'>Example 1 - Realtime Circles</h1>

<h2 id='installation'>Installation</h2>

[Go Back to Summary](#summary)

*  `npm i`
*  `npm i socket.io`

   ```Bash
      touch public/javascripts/app.js
      touch io.js
   ```
   * We don't want to unnecessarily clutter `server.js`, so we're going to put our socket.io related code in a separate module file.
   * socket.io, needs to attach to the http server, not the Express app.

<h2 id='config-server'>Configure the Server</h2>

[Go Back to Summary](#summary)

* In `bin/wwww`:
  * In an Express app scaffolded using `express-generator`, the http server lives inside of the `/bin/www` file, so that is where we will require our new `io.js` module and attach to the http server.

   ```JavaScript
      var server = http.createServer(app);
      const io = require('../io');                  //! Load socket.io to http server below `var server = http.createServer(app);`
      io.attach(server);                            //! Attach socket.io to http server
   ```

* In `io.js` module:

   ```JavaScript
      //! Require Packages
         const io = require('socket.io')();

      //! Listen for new connections from clients (socket)
         io.on('connection', function (socket) {
            console.log('Client connected to socket.io!');
         });

      //! Export socket.io
         module.exports = io;
   ```

* In `index.ejs`:

   * Add the following code to the body

   ```HTML
         <header><span>realtime-circles</span><button>clear</button></header>
         <section id="circles"></section>
         <footer><ul id="players"></ul></footer>

         <script src="/socket.io/socket.io.js"></script>
         <script src="/javascripts/app.js"></script>
   ```

<h2 id='config-client'>Configure the Client</h2>

[Go Back to Summary](#summary)

* It takes quite a bit of JavaScript in the browser to connect to socket.io on the server and implement all of its goodness.
* Lucky for us, the socket.io module on the server helps us out by creating a secret route that returns dynamically generated JavaScript for the client - hassle free!
* The code returned to the browser is pre-configured with the server's info, etc.

* In `views/index.ejs`:

  * All we need to do is load this special client configuration script, **bofore the closing body tag**.

   ```HTML
            // special route created by socket.io on the server
            <script src="/socket.io/socket.io.js"></script>
            <script src="/javascripts/app.js"></script>
         </body>
   ```

* In `public/javascripts/app.js`:
  * The `socket.io.js` client script exposes an `io` global function that we call to obtain our connection to the server.
  * Let's call it and assign the returned connection object to a variable named `socket`.

   ```JavaScript
         //! Get our connection to the socket.io server
            const socket = io();
            console.log(socket);
   ```

  * Refresh the browser and verify that:
    * The `socket` object logged in the browser's console has a `connected: true` porperty.
      ![](./images/socket-001.png)
    * The server's terminal windows logged out the message "Client connected to socket.io!".
      ![](./images/socket-002.png)

<h2 id='logic'>Code Logic</h2>

[Go Back to Summary](#summary)

* Server
  * To accomplish our requirements, this is what we will need to do on the server:
    1. Listen for `add-circle` message being sent from the clients.
    2. When an `add-circle` message is received, forward (`emit`) it (along with the data received with the message) to all connected clients (including the client that sent the message to begin with).

* Client
  * To accomplish for `add-circle` message from the server.
    1. Listen for `add-circle` messas from the server.   
    2. When to `add-circle` message is received, it will containa data object with the properties necessary to pass to the existing `addCircle()` function that creates circles!.
    3. In the existing click handler, `emit` the `add-circle` message to the server, passing along an object containing the `initials`, `x`, `y`, `dia` and `rgb` properties.

* Messages - Review
  * The `add-circle` message is a custom event messsage that we **defined** based upon what made sense for this application.
  * Each message can be `emitted` with data. The data can be any type except for a function. Objects and arrys come in handy for sending complex rather than a single piece of primitive data.

<h2 id='displaying'>Displaying Circles in Realtime</h2>

<h3 id='displaying-server'>Displaying Circles - Server Code</h3>

[Go Back to Summary](#summary)

* In `io.js`:

   ```JavaScript
      //! Require Packages
         const io = require('socket.io')();

      //! Listen for new connections from clients (socket)
         io.on('connection', function (socket) {
            socket.on('add-circle', function (data) {
               io.emit('add-circle', data);
            });
         });

      //! Export socket.io
         module.exports = io;
   ```
   * Remember, `io` represents the server and `socket` the current client.
   * When a client (`socket`) conects to the server, we're using the `on` method to set up a listener on the server to listen messages sent **from that client**.
   * When the server receives an `add-circle` message from the client, the callback function will send the same message to all clients using the server's (`io`) **`emit`** method.

<h3 id='displaying-client'>Displaying Circles - Client Code</h3>

[Go Back to Summary](#summary)

* In `public/javascripts/app.js`
  * Listen for an `add-circle` message from the server.

   ```JavaScript
         //! Get our connection to the socket.io server
            const socket = io();

         //! Listen to the server for the `add-circle` event
            socket.on('add-circle', function (data) {
               console.log(data);
            });
   ```

     * On the client browser, we have the `socket` object representing our realtime connection to the server.
     * For now, we're simply logging out data received from the server.
   * Now let's upate the click event listener to `emit` an `add-circle` message to the server with the data:

   ```JavaScript
         //! Get our connection to the socket.io server
            const socket = io();
            const circles = document.getElementById('circles');         //! Get circles from the DOM

         //! Listen to the server for the `add-circle` event
            socket.on('add-circle', function (data) {
               console.log(data);
            });

         //! Create a click eventListner to send msg to the server
            circles.addEventListener('click', function(evt) {
               socket.emit('add-circle', {
                  initials: initials,
                  x: evt.clientX,
                  y: evt.clientY,
                  dia: randomBetween(10,100),
                  rgba: getRandomRGBA()
               });
            });
   ```

<h2 id='recap'>Recap</h2>

[Go Back to Summary](#summary)

* To recap, our code so far:
  1. Emit's `add-circle` messas from data to the server when a user clicks.
  2. Receives `add-circle` message emitted from the server and console logs their data.
  3. Before testing, edit the css file, otherwise we won't be able to click on our page

   ```css
         html, body {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
            font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
         }

         #circles {
            width: 100%;
            height: 100%;
         }

         #circles div {
            border-radius: 50%;
            position: absolute;
         }

         header {
            position: absolute;
            top: 10px;
            left: 20px;
            width: 100%;
            z-index: 999;
            font: lighter 20px "Courier New";
            color: purple;
         }

         header button {
            float: right;
            margin-right: 30px;
            padding: 6px;
            background-color: purple;
            color: white;
            border-style: none;
            border-radius: 4px;
         }

         footer {
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
         }

         li {
            list-style: none;
            display: inline;
            font: 12px Arial;
            color: white;
            border-radius: 4px;
            background-color: gray;
            padding: 4px;
            margin-right: 5px;
         }
   ```

<h2 id='finish-app'>Finish app.js - Client Code</h2>

[Go Back to Summary](#summary)

* Let's finish our `public/javascripts/app.js` to avoid erros and warnings.

   ```JavaScript
         //! Get our connection to the socket.io server
            const socket = io();
            let circles = document.getElementById('circles');         //! Get circles from the DOM
            let buttom = document.getElementsByTagName('button');

         //! Listen to the server for the `add-circle` event
            socket.on('add-circle', function (data) {
               addCircle(data);
            });
            
         //! Create a click eventListner to send msg to the server
            circles.addEventListener('click', function(evt) {
               console.log(evt);
               
               socket.emit('add-circle', {
                  initials: initials,
                  x: evt.clientX,
                  y: evt.clientY,
                  dia: randomBetween(10,100),
                  rgba: getRandomRGBA()
               });
            });

         //! Pop up to input the initials
            function getInitials() {
            const input = prompt('Please enter your initials');
            return input ? input.toUpperCase() : '';
            };

         //! Get the initial
            do {
               initials = getInitials();
            } while (initials.length < 2 || initials.length > 3);


         //! Clear Button - eventListener on the button
            buttom[0].addEventListener('click', function() {
               socket.emit('clear-circles');
            });

         //! Add Circlet to the DOM
            function addCircle({ x, y, dia, rgba, initials }) {
               const el = document.createElement('div');
               el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
               el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
               el.style.width = el.style.height = dia + 'px';
               el.style.backgroundColor = rgba;
               el.style.fontSize = Math.floor(dia / 3) + 'px';
               el.style.color = 'white';
               el.style.textAlign = 'center';
               el.style.lineHeight = dia + 'px';
               el.innerHTML = initials;
               circles.appendChild(el);
            };

         //! Random math to get the RGBA colors
            function randomBetween(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
            };

         //! Get random color
            function getRandomRGBA() {
            return [
               'rgba(',
               randomBetween(0, 255),
               ',',
               randomBetween(0, 255),
               ',',
               randomBetween(0, 255),
               ',',
               randomBetween(2, 10) / 10,
               ')'
            ].join('');
            }; 
   ```

<h1 id='example-2'>Example 2 - Realtime Circles and Players</h1>

[Go Back to Summary](#summary)

* Installation

  *  `npm i`
  *  `npm i socket.io`

   ```Bash
        touch public/javascripts/app.js
        touch io.js
   ```

* In `bin\www`:
   * Add after `var server = http.createServer(app);`

   ```JavaScript
         const io = require('../io');                  //! Load socket.io to http server below `var server = http.createServer(app);`
         io.attach(server);                            //! Attach socket.io to http server
   ```

* In `io.js`:

   ```JavaScript
         //!          ,pP"Ybd  .gP"Ya  `7Mb,od8 `7M'   `MF' .gP"Ya  `7Mb,od8 
         //!          8I   `" ,M'   Yb   MM' "'   VA   ,V  ,M'   Yb   MM' "' 
         //!          `YMMMa. 8M""""""   MM        VA ,V   8M""""""   MM     
         //!          L.   I8 YM.    ,   MM         VVV    YM.    ,   MM     
         //!          M9mmmP'  `Mbmmd' .JMML.        W      `Mbmmd' .JMML.   

         //! Require Packages
            const io = require('socket.io')();
            let players = {};

         //! Listen for new connections from clients (socket)
            io.on('connection', function (socket) {
               //+ Client/Socket sent a msg to 'register-player'
                  socket.on('register-player', function(initials) {
                     players[socket.id] = initials;       //- Each socket has an unique id
                     io.emit('update-player-list', Object.values(players));
                  });
               //+ Client/Socket sent a msg to 'add-circle'
                  socket.on('add-circle', function (data) {
                     io.emit('add-circle', data);
                  });
               //+ Client/Socket sent a msg to 'clear-circles'
                  socket.on('clear-circles', function(data) {
                     io.emit('clear-circles', data);
                  });
               //+ Client/Socket sent a msg to 'disconnect'
                  socket.on('disconnect', function() {
                     delete players[socket.id];          //- Delete this id from the list
                     io.emit('update-player-list', Object.values(players));
                  });
            });

         //! Export socket.io
            module.exports = io;
   ```
* In `public/javascript/app.js`:

   ```JavaScript
      //!                        ,,    ,,                               
      //!            .g8"""bgd `7MM    db                         mm    
      //!          .dP'     `M   MM                               MM    
      //!          dM'       `   MM  `7MM   .gP"Ya  `7MMpMMMb.  mmMMmm  
      //!          MM            MM    MM  ,M'   Yb   MM    MM    MM    
      //!          MM.           MM    MM  8M""""""   MM    MM    MM    
      //!          `Mb.     ,'   MM    MM  YM.    ,   MM    MM    MM    
      //!            `"bmmmd'  .JMML..JMML. `Mbmmd' .JMML  JMML.  `Mbmo 

      //! Get our connection to the socket.io server
         const socket = io();
         let circles = document.getElementById('circles');        //! Get circles from the DOM
         let buttom = document.getElementsByTagName('button');    //! Get buttom from the DOM
         let playersEl = document.getElementById('players');      //! Get palyers from the DOM
         let initials = '';

      //! Listen to the server for the `add-circle` event
         socket.on('add-circle', function (data) {
            addCircle(data);
         });

      //! Listen to the server for the `clear-circles` event
         socket.on('clear-circles', function(data) {
            circles.innerHTML = '';
         });

      //! Listen to the server for the `update-players-list` event
         socket.on('update-player-list', function(data) {
            let playerList = '<li>' + data.join('</li><li>') + '</li>';
            playersEl.innerHTML = playerList;
         });

      //! Create a click eventListner to send msg to the server
         circles.addEventListener('click', function(evt) {
            console.log(evt);
            
            socket.emit('add-circle', {
               initials: initials,
               x: evt.clientX,
               y: evt.clientY,
               dia: randomBetween(10,100),
               rgba: getRandomRGBA()
            });
         });

      //! Pop up to input the initials
         function getInitials() {
            const input = prompt('Please enter your initials');
            return input ? input.toUpperCase() : '';
         };

      //! Get the initial
         do {
            initials = getInitials();
         } while (initials.length < 2 || initials.length > 3);

      //! Emit to the server a player initials
         socket.emit('register-player', initials);

      //! Clear Button - eventListener on the button
         buttom[0].addEventListener('click', function() {
            socket.emit('clear-circles');
         });

      //! Add Circlet to the DOM
         function addCircle({ x, y, dia, rgba, initials }) {
            const el = document.createElement('div');
            el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
            el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
            el.style.width = el.style.height = dia + 'px';
            el.style.backgroundColor = rgba;
            el.style.fontSize = Math.floor(dia / 3) + 'px';
            el.style.color = 'white';
            el.style.textAlign = 'center';
            el.style.lineHeight = dia + 'px';
            el.innerHTML = initials;
            circles.appendChild(el);
         };

      //! Random math to get the RGBA colors
         function randomBetween(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
         };

      //! Get random color
         function getRandomRGBA() {
            return [
               'rgba(',
               randomBetween(0, 255),
               ',',
               randomBetween(0, 255),
               ',',
               randomBetween(0, 255),
               ',',
               randomBetween(2, 10) / 10,
               ')'
            ].join('');
         };
   ```

* In `views/index.ejs`:

   ```HTML
      <!DOCTYPE html>
      <html>
      <head>
         <title><%= title %></title>
         <link rel='stylesheet' href='/stylesheets/style.css' />
      </head>
      <body>
         <header><span>realtime-circles</span><button>clear</button></header>
         <section id="circles"></section>
         <footer><ul id="players"></ul></footer>

         <script src="/socket.io/socket.io.js"></script>
         <script src="/javascripts/app.js"></script>
      </body>
      </html>
   ```