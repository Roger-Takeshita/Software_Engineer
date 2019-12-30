//! Require Puppy Schema
   const Puppy = require('../../models/puppySchema');

//! Index
   const index = function(req, res) {
      Puppy.find({}, function(err, puppies) {
         res.status(200).json(puppies);
      });
   };

//! Show One Puppy
   const showOne = function(req, res) {
      Puppy.findById(req.params.id)
      .then(puppy => {
         if (puppy) {
            res.json(puppy);
         } else {
            res.status(404).json({error: 'Puppy not found'});
         }
      })
      .catch(err => {
         res.status(500).json({error: 'Oh No!'});
      });
   };

//! Create a Puppy
   const create = function(req, res) {
      console.log(req.body);
      Puppy.create(req.body)
      .then(puppy => {
         res.json(puppy);
      })
      .catch(err => {
         res.status(500).json({ error: 'Something went wrong' });
      });
   };

//! Update a Puppy
   const update = function(req, res) {
      Puppy.findByIdAndUpdate(req.params.id, req.body, {
         new: true
      })
      .then(puppy => {
         res.json(puppy);
      })
      .catch(err => {
         res.status(404).json({error: 'Puppu not found!'});
      });
   };

//! Delete a Puppy
   const deletePuppy = function(req, res) {
      Puppy.findByIdAndDelete(req.params.id)
      .then(removePuppy => {
         res.json(removePuppy);
      });
   };


//! Export methods/functions to route
   module.exports = {
      index,
      showOne,
      create,
      update,
      delete: deletePuppy
   };
