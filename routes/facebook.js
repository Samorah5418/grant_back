const express = require('express');
const router = express.Router();
const facebookUser = require('../controller/facebook');

router.route('/signup')
     .get((req, res) => {res.render('facebook/signup')})
     .post(facebookUser.signup);

router.get('/users', (req, res) =>{  res.render('facebook/user') })

router.get('/users/admin', facebookUser.getAllUsers)

module.exports = router