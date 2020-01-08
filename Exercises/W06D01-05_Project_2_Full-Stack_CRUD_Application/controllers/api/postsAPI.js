const Post = require('../../models/post');

//! Find All Posts
   const index = function(req, res) {
      Post.find({}, function(err, posts) {
         res.status(200).json(posts);
      });
   };

//! Find One Post
   const showOnePost = function(req, res) {
      Post.findById(req.params.id)
      .then(post => {
         if (post) {
            res.json(post);
         } else {
            res.status(404).json({error: 'Post not found'});
         }
      })
      .catch(err => {
         res.status(500).json({error: 'Oh no!'});
      })
   };

//! Export methods/functions to route
   module.exports = {
      index,
      showOnePost
   };