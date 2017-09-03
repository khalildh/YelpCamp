const mongoose = require('mongoose'),
Campground = require('./models/campground'),
Comment = require('./models/comment');

const data = [
  {
    name: "Cloud's Rest",
    image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Desert Mesa",
    image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Canyon Floor",
    image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
];


function seedDB(){
// Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Removed campgrounds!");
      // add a few campgrounds!
        // data.forEach(function(seed){
        //   Campground.create(seed, function(err, campground) {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       console.log("Added a campground!");
        //       //create a comment
        //       Comment.create({
        //         text: "This place is great, but I wish there was internet",
        //         author: "Homer"
        //       }, function(err, comment) {
        //         if (err) {
        //           console.log(err);
        //         } else {
        //           campground.comments.push(comment);
        //           campground.save();
        //           console.log("Created a new comment");
        //         }
        //       });
        //     }
        //   });
        // });
    }
  });
}

module.exports = seedDB;
