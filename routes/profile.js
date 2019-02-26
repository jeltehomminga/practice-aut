var express = require('express');
var router          = express.Router();
const User          = require("../models/user");

router.get('/', (req, res) => {
    User.findOne({ "username": req.signedCookies.username }, (err, user) => {
        user ? res.render('profile', {user}) : res.render('profile'); 
    })
});

module.exports = router;