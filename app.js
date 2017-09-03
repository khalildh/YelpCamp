var express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      passport    = require('passport'),
      LocalStrategy = require('passport-local'),
      methodOverride = require('method-override'),
      flash       = require('connect-flash'),
      server      = 8000,
      Campground  = require('./models/campground'),
      Comment     = require('./models/comment'),
      User        = require('./models/user'),
      seedDB      = require('./seeds');



var DEPLOYED;
if (process.argv[2]) {
  DEPLOYED = process.argv[2];
  console.log(DEPLOYED);
}


var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
// seedDB(); // seed the database



// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash('success');
  next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


if (DEPLOYED) {
  app.listen(process.env.PORT, process.env.IP);
} else {
  app.listen(server, function(){
    console.log("The YelpCamp v12 server has started on port " + server + "!");
  });
}
