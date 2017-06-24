var express = require("express");
var path = require("path");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require("../models/User");
var apiRoutes = require("./apiRoutes");
var router = new express.Router();


passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use('local-signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, username, password, done) {
  User.findOne({ 'emailId': username }, function (err, user) {
    if (err)
      return done(err);
    if (!user) {
      console.log('User Not Found with username ');
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (password !== user.password) {
      console.log('Invalid Password');
      return done(null, false, { message: 'Incorrect Password.' });
    }
    console.log('Success login');
    return done(null, user);
  });
}));

// Use the apiRoutes module for any routes starting with "/api"
router.use("/api", apiRoutes);

// Other routes module for any routes starting with "/api"
router.post('/login', passport.authenticate('local-signin'), function (req, res) {
    // console.log(req);
    res.json(req.user);
});

router.get('/logout', function(req, res){
  req.session.destroy();
  req.logout();
});

// All other requests the index.html page
// React router will handle routing withing the app
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
