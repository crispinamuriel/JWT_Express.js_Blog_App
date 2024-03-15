// Import the JWT token
const jwt = require('jsonwebtoken');

// Create the function on the token
const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  // Check if there is a correct token with the requested token
  if (!token) return res.status(403).json({ error: 'Access Denied.' }); // Forbidden, Unauthorized

  try {
    // JWT verifs our secret with verify method that takese in token string in our env variables
    const decoded = jwt.verify(
      token.substring(7), // Remove the bearer prefix from the token
      process.env.JWT_SECRET
    );
    // Get user from request
    req.user = {
      userID: decoded.id,
    };
    // Move onto the next middleware function
    next();
  } catch (error) {
    res.status(403).json({ error: error.message + ' Access Denied.' });
  }
};

module.exports = {
  authMiddleware,
};
