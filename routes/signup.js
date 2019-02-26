var express = require('express');
var router          = express.Router();
var Recaptcha       = require('express-recaptcha').Recaptcha;
var recaptcha       = new Recaptcha('6LeVxJMUAAAAAI5LrJLvOMnQ3gwjC7R3sb6km13O', '6LeVxJMUAAAAAEsqhZlOlpROHyjZoyW17iUZpmM3');
const User          = require("../models/user");
const bcrypt        = require("bcrypt");
const bcryptSalt    = 10;


//TODO: check already for cookie and redirect to profile?
router.get('/', recaptcha.middleware.render, (req, res) => {
    req.signedCookies.username ? res.redirect('/profile') :  res.render('signup', { captcha:res.recaptcha })
}
);

router.post("/", (req, res, next) => {
  const username = req.body.username;
  const email    = req.body.email;   
  const password = req.body.password;

  User.findOne({ "username": username }, {"email": email})
  .then(result => {
      debugger
    if (result) res.render("signup", {errorMessage: "The username/email already exists!"});
        else {
            const salt     = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);     
            User.create({
                username,
                email,
                password: hashPass
            })
            .then(() => {
                res.cookie('username', username, {signed : true});
                res.redirect("/users")
            })     
            .catch(error => console.log(error))    
        }
    })
});



module.exports = router;