   const express = require('express');
   const router = express.Router();
   const moviesCtrl = require('../../controllers/api/moviesAPIController');

   router.get   ('/',    moviesCtrl.index);
   router.get   ('/:id', moviesCtrl.showOne);
   router.post  ('/',    moviesCtrl.create);
   router.put   ('/:id', moviesCtrl.update);
   router.delete('/:id', moviesCtrl.delete);

   module.exports = router;
