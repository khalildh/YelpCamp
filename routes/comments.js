var  express = require('express');
var router = express.Router({mergeParams: true});
var Comment = require('../models/comment');
var Campground = require('../models/campground');
var  middleware = require('../middleware/');


// ======================
// COMMENTS ROUTES
// ======================


// COMMENTS NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err);
    } else {
        res.render("comments/new", {campground: campground});
    }
  });

});


// COMMENTS CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground){
      if (err) {
        console.log(err);
        req.flash("error", "Something went wrong");
        res.redirect('/campgrounds');
      } else {
        Comment.create(req.body.comment, function(err, comment){
          if (err) {
            console.log(err);
          } else {
            // add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            comment.save();
            campground.comments.push(comment);
            campground.save();
            console.log(comment);
            req.flash('success', 'Successfully created comment');
            res.redirect('/campgrounds/' + campground._id);
          }
        });
      }
  });
});

// COMMENT EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
    }
  });
});

// COMMENT UDPATE
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
  // res.send("hellofadsjkdldsafj")
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment){
    if (err) {
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// COMMENT DESTROY
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if (err) {
      res.redirect('back');
    } else {
      req.flash('success', "Comment deleted");
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});





module.exports = router;
