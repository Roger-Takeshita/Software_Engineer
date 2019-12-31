const passport = require('passport');                                         //! Require passport package
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;       //! Require google strategy after passport
const Student = require('../models/student');                                 //! Require database schema

passport.use(new GoogleStrategy(
   {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
   },
   function(accessToken, refreshToken, profile, cb) {
      Student.findOne({ 'googleId': profile.id }, function(err, student) {
         if (err) return cb(err);
         if (student) {
            return cb(null, student);
         } else {                                              //+ we have a new student via OAuth!
            let newStudent = new Student({
               name: profile.displayName,
               email: profile.emails[0].value,
               googleId: profile.id
            });
            newStudent.save(function(err) {
               if (err) return cb(err);
               return cb(null, newStudent);
            });
         }
      });
   }
));

passport.serializeUser(function(student, done) {               //+ Get the id
   done(null, student.id);
});

passport.deserializeUser(function(id, done) {                  //+ Use the id to find a user in our database
   Student.findById(id, function(err, student) {
      done(err, student);
   });
});