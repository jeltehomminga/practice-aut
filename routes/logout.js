var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    // if (req.signedCookies.username) {
        debugger
        res.clearCookie("username");
        res.redirect('/users')
    // }

    // res.render("you're already logged out");

})


module.exports = router;