const express = require('express');
const router  = express.Router();

router.get('/*', (req, res, next) => req.signedCookies.username ? next() : res.redirect('/login'));

module.exports = router;