// Require our dependecies
var express = require("express");
var mongoose = require("mongoose");
var bluebird = require("bluebird");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');

var PORT = process.env.PORT || 4000;
mongoose.Promise = bluebird;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

var routes = require("./routes/routes");
app.use("/", routes);

// var mongoDB = "mongodb://heroku_qwcxn1pp:2218m91ki7ieu9vsnkcj35dhma@ds139879.mlab.com:39879/heroku_qwcxn1pp" ;

var mongoDB = "mongodb://localhost/givingGoodsApp";

mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Start the server
app.listen(PORT, function () {
  console.log("Visit localhost:%s in your browser.", PORT);
});
