var  express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


// ROOTE ROUTE
router.get("/", function(req, res){
  res.render("landing");
});

// CHART ROUTE
router.get("/chart", function(req, res) {
  console.log("GET: '/chart'");
  res.render("chart");
});





//   =================
//   AUTH ROUTES
//   =================

// USER SIGNUP Form ROUTE
router.get("/register", function(req, res){
  res.render('register');
});

//  USER CREATE ROUTE
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      req.flash("error", err.message);
      return res.redirect("/register");
    }
    passport.authenticate('local')(req, res, function(){
      req.flash('success', "Welcome to YelpCamp " + user.username);
      res.redirect('/campgrounds');
    });
  });
});

// show login form
// USER LOGIN FORM ROUTE
router.get('/login', function(req, res){
  res.render('login');
});

// USER LOGIN redirect ROUTE
router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), function(req, res){
      // res.send('does it work');
});

// logout ROUTES

// USER LOGOUT ROUTE
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('/campgrounds');
});

module.exports = router;
