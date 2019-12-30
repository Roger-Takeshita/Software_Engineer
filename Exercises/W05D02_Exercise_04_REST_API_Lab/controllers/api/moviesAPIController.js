const Movie = require('../../models/movie');
const Performer = require('../../models/performer');

const index = function(req, res) {
   Movie.find({}).populate('cast')
   .then(movies => {
      res.status(200).json(movies);
   })
   .catch(err => {
      res.status(404).json({error: 'Movies not found!'});
   });
};

const showOne = function(req, res) {
   Movie.findById(req.params.id).populate('cast')
   .then(movie => {
      if (movie) {
         res.json(movie);
      } else {
         res.status(404).json({error: 'Movie not found'});
      }
   })
   .catch(err => {
      res.status(500).json({error: 'Your broke the server'});
   });
};

const create = function(req, res) {
   Movie.create(req.body)
   .then(movie => {
      res.json(movie);
   })
   .catch(err => {
      res.status(500).json({error: 'Something went wrong'});
   });
};

const update = function(req, res) {
   Movie.findOneAndUpdate(req.params.id, req.body, {
      new: true
   })
   .then(movie => {
      res.json(movie);
   })
   .catch(err => {
      res.status(404).json({error: 'Movie not found'})
   });
};

const deleteMovie = function(req, res) {
   Movie.findByIdAndDelete(req.params.id)
   .then(removeMovie => {
      res.json(removeMovie);
   })
   .catch(err => {
      res.status(404).json({error: 'Something went wrong'});
   });
};

module.exports = {
   index,
   showOne,
   create,
   update: update,
   delete: deleteMovie
}