// Import neccessary modules || dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Create an instance of Express App!
const app = express();

// Middleware - make sure that we use proper data structure!
app.use(express.json());
app.use((req, res, next) => {
  console.log(
    'This is the request path:',
    req.path,
    'This is the request method:',
    req.method
  );
  if (req.body) {
    console.log('Request body:');
    console.log(req.body);
  }
  next();
});

// Routes for posts .use(arg1=path, arg2=require())
app.use('/api/posts/', require('./src/routes/post.js'));
// Route for users
app.use('/api/users', require('./src/routes/user.js'));

// connect to our MongoDB (Database!) with ORM
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.log('Error connecting to MongoDB:', e.message);
  });

// connection string, configuration object ensuring our connection will work correctly
// .then let dev know we connected successfully OR
// .catch log the error if not connected successfully

// Start the server
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
