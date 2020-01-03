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