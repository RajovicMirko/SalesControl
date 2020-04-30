//ROUTER SETUP
const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require('../Models/user');

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(401).end(); }
	  
		if (!user) {
			res.statusMessage = 'Invalid username or password';
			res.status(400).end();
			return;
		}
	  
    req.login(user, function(err) {
			if (err) {
				res.status(401).end();
				return next(err);
			}
			console.log(`user ${ user.name } is logged in`);
			res.status(200).send(user);
			return;
    });
  })(req, res, next);
});

router.post("/register", (req, res) => {
	var newUser = new User({
		username: req.body.username,
		name: req.body.name,
		email: req.body.email
	});
	
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			res.status(400).send(err);	
		};
		
		passport.authenticate("local")(req, res, function(){
			res.status(200).send(user);
		});
	});
});

router.get('/logout', function(req, res){
	req.logout();
	res.statusMessage = 'User is logged out';
	res.status(200).end();
});

module.exports = router;



function isLogedIn(req, res, next){
	return next();
	console.log(req.isAuthenticated());
	
	if(req.isAuthenticated()){
		return next();
	}
	res.status(401).send({
		message: "You are not allowed to do that"
	})
}