var express = require("express");
var path = require("path");
var passport = require('passport');
const nodemailer = require('nodemailer');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var User = require("../models/User");
var apiRoutes = require("./apiRoutes");
var router = new express.Router();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'remylists@gmail.com',
    pass: 'remylists000'
  }
});

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
    if (!bcrypt.compareSync(password, user.password)) {
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
  res.json(req.user);
});

router.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.post('/contact-admin', function (req, res) {
  var senderAddress = req.body.clientEmail;
  var senderSubject = req.body.clientSubject;
  var senderMessage = req.body.clientMessage;
  let mailOptions = {
    from: '"Giving goods mailing service (No reply)"<foo@noreply.com>',
    to: "remylists@gmail.com",
    subject: senderSubject,
    text: "From : " + senderAddress + " Message : " + senderMessage,
    html: '<b>From : </b>' + senderAddress + '<p><b>Message : </b>' + senderMessage + '</p>'
  };
  sendMailToUser(mailOptions, function (status) {
    if (status)
      res.json("Sent mail to the admin");
    else
      res.json(false);
  });
});

router.post('/contact-shelter', function (req, res) {
  var donorAddress = req.body.donorEmail;
  var donorSubject = req.body.donorSubject;
  var donorMessage = req.body.donorMessage;
  var shelterMail = req.body.shelterMail;
  let mailOptions = {
    from: '"Giving goods mailing service (No-reply)"<foo@noreply.com>',
    to: shelterMail,
    subject: donorSubject,
    text: "From : " + donorAddress + " Message : " + donorMessage,
    html: '<b>From : </b>' + donorAddress + '<p><b>Message : </b>' + donorMessage + '</p>'
  };
  sendMailToUser(mailOptions, function (status) {
    if (status)
      res.json("Sent mail to the shelter");
    else
      res.json(false);
  });
});

// All other requests the index.html page
// React router will handle routing withing the app
router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

function sendMailToUser(mailOptions, cb) {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      cb(false);
      return false;
    }
    console.log(info);
    cb(true);
    return true;
  });
}

module.exports = router;
