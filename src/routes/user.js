const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/user');

// Create route for signup
router.post('/signup', signupUser);

// Create the route for login, Request the JWT and login using the body
router.post('/login', loginUser);

module.exports = router;
