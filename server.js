//APP SETUP
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
//const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const app = express();
require("./server/dbController"); //connecting to DB

const User = require('./server/Models/user');

//APP USAGE AND AUTH SETUP

app.use(require("express-session")({
	secret: "secret",
	resave: false,
	saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser('secret'));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.body;
	next();
});

// ALL ROUTES
//auth
const userAuth = require("./server/Routes/authorisation");
app.use('/api', userAuth);

//partners
const partnersRoutes = require("./server/Routes/partners");
app.use('/api/partners', partnersRoutes);

//orders
const ordersRoutes = require("./server/Routes/orders");
app.use('/api/orders', ordersRoutes);


if (process.env.NODE_ENV === 'production'){
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  //Handle SPA
  app.get(/.*/, (req,res) => res.sendFile(__dirname + '/public/index.html'));
}

app.use(history());
app.use(serveStatic(__dirname + '/dist/spa/'));

//STARTING APP
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
	console.log(`Server is connected on port ${PORT}`);
})