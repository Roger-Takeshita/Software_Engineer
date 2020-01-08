const User = require('../models/user');         //! Require Models Schema
const Post = require('../models/post');

function index(req, res, next) {
   // Post.find().populate('user').populate({path:'comments.user', select: ['givenName', 'familyName']}).exec(function(err, userNameComments) {
   //    console.log(userNameComments[0].comments[0]);
      Post.find().populate({path: 'user', select: ['givenName', 'familyName', 'post', 'adm', 'avatar', 'comments']}).populate({path:'comments.user', select: ['givenName', 'familyName']}).exec(function(err, posts) {           
         res.render('index', {
            title: `INDEX PAGE`,
            posts,
            user: req.user,
         });
      });
   // });
};

function newPost (req, res) { 
   let post = new Post ({
      post: req.body.text,
      user: req.user._id
   });
   post.save(function(err) {
      if(err) return res.redirect('/');
      res.redirect('/');
   });

};

function updatePost (req, res) {
   
};

function deletePost (req, res) {
   Post.deleteOne({'comments._id': req.params.id}, function(err, comment) {
      console.log(comment);
      
      if (err) {
         console.log(err);
      } else {
         console.log('One comment was deleted: ' + comment.comment);
         res.redirect('/');
      }
   });
};

function newComment (req, res) {
   Post.findById({path:'comments._id', }, function(err, post) {
      let comment = {
         comment: req.body.text,
         user: req.user._id
      }
      post.comments.push(comment);
      post.save(function(err) {
         res.redirect('/');
      });
   });
};

function updateComment (req, res) {
   
};

function deleteComment (req, res) {
   
   // Post.find({'comments.comment._id': req.params.id}, function(err,doc) {
   //    console.log(doc);
      
   // })
   // Post.comments.remove()
   // Post.deleteOne({'comments.comment._id': req.params.id}, function(err, comment) {
   //    console.log( comment);
      
   //    if (err) {
   //       console.log(err);
   //    } else {
   //       console.log('One comment was deleted: ' + comment);
   //       res.redirect('/');
   //    }
   // });
};

module.exports = {
   index,
   newPost,
   updatePost,
   deletePost,
   newComment,
   updateComment,
   deleteComment
};