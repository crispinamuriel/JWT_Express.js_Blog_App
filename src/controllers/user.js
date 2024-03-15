// Import model schema
const User = require('../models/user');
// Get bcrypt and JWT for auth
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User signup
const signupUser = async (req, res) => {
  // Destructure username and password that user sends, it's in the req.body
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      return res
        .status(400)
        .json({ error: 'Username already in use, username must be unique.' });
    }
    // Hash password by passing in the password we destructured above, and salt#
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new User
    const newUser = await User.create({
      username,
      password: hashedPassword, // Pass in the new hashed password
    });
    // Success, send a response
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  // Destructure username and password from request.body;
  const { username, password } = req.body;
  try {
    // See if there is an existing user
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.status(404).json({ error: 'Username not found' });
    }
    // Check if the password sent by the user matches the password in our mongoDB
    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordMatched) {
      return res.status(400).json({ error: 'Incorrect password' });
    }
    // Create the JWT by passing in the userId from our found user and the JWT secret string
    const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET);
    // Send the token back to the client
    res.status(200).json({ username, token });
    // Client saves the token to be used for authentication inside the Authorization, Berer Token of the next request
  } catch (error) {
    res.stataus(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
