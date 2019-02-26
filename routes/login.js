var express = require('express');
var router = express.Router();
var Recaptcha = require('express-recaptcha').Recaptcha;
var recaptcha = new Recaptcha('6LeVxJMUAAAAAI5LrJLvOMnQ3gwjC7R3sb6km13O', '6LeVxJMUAAAAAEsqhZlOlpROHyjZoyW17iUZpmM3');
const User           = require("../models/user");
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

router.get('/', recaptcha.middleware.render, (req, res) => res.render('login', { captcha:res.recaptcha }));

router.post("/", (req, res, next) => {
    const username = req.body.usernameoremail;
    const password = req.body.password;      
    if (username === "" || password === "") { 
       return res.render("login", {errorMessage: "Please enter both, username and password to sign up."});
    } 
    User.findOne({ "username": username })
    .then(user => {
        if (!user) {
            res.render("login", { errorMessage: "The username doesn't exist."});
        } else if (bcrypt.compareSync(password, user.password)) {
            req.currentUser = user;
            res.cookie('username', username, {signed : true});
            res.redirect("/auth/profile");
        } else {
            res.render("login", {errorMessage: "Incorrect password"});
        }
    })
    .catch(error => {
      next(error);
    })
  });

module.exports = router;