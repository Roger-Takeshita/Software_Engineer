const express = require('express');
const router = express.Router();
const passport = require('passport');                          //! Require passport package
const mainCtrl = require('../controllers/main');

router.get   ('/', mainCtrl.index);
router.post  ('/', mainCtrl.newPost);
router.put   ('/', mainCtrl.updatePost);
router.delete('/', mainCtrl.deletePost);

router.post  ('/comment/:id', mainCtrl.newComment);
router.put   ('/comment/:id', mainCtrl.updateComment);
router.delete('/comment/:id', mainCtrl.deleteComment);

router.get('/auth/google', passport.authenticate(
   'google',
   { 
      scope: ['profile', 'email'] 
   }
));

router.get('/oauth2callback', passport.authenticate(
   'google',
   {
      successRedirect : '/',
      failureRedirect : '/  '
   }
));

router.get('/logout', function(req, res){
   req.logout();
   res.redirect('/');
});

module.exports = router;