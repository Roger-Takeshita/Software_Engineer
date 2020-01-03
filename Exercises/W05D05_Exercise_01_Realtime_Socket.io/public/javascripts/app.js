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