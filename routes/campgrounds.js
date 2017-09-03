
var  express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var  middleware = require('../middleware/');

// LIST CAMPGROUND ROUTE
router.get("/", function(req, res) {
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {"campgrounds": allCampgrounds, currentUser: req.user});
    }
  });
});

// CREATE CAMPGROUND ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, price:price, image: image, description: desc, author: author};

  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect("/campgrounds");
    }
  });


});


// NEW CAMPGROUND ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});


// SHOW - shows more info about one campground
// DETAIL CAMPGROUND ROUTE
router.get("/:id", function(req, res) {
  // Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
  //   if (err) {
  //       console.log(err);
  //       res.redirect('/campgrounds');
  //   } else {
  //     console.log(foundCampground);
  //     res.render("campgrounds/show", {"campground": foundCampground});
  //   }
  // });
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err || foundCampground == undefined) {
      console.log(err);
      req.flash("error", "Sorry, that campground does not exist!");
      return res.redirect('/campgrounds');
    }
    console.log(foundCampground);
    res.render("campgrounds/show", {campground: foundCampground});
  });
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
  // is user logged in
//       Campground.findById(req.params.id, function(err, foundCampground){
//           res.render('campgrounds/edit',  {campground: foundCampground});
//       });
        Campground.findById(req.params.id, function(err, foundCampground){
          if (err || foundCampground == undefined) {
            console.log(err);
            req.flash("error", "Sorry, that campground does not exist");
            return res.redirect("/campgrounds");
          }
          res.render("campgrounds/edit", {campground: foundCampground});
        });
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    console.log(req.body.campground);
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
  // redirect somewhere(show page)
});


// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
});



module.exports = router;
