const express = require('express');

// Create an express instance so we can use the routers
const router = express.Router();

// Import createPost to create a post!
const {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} = require('../controllers/post');

// Import Auth middleware
const { authMiddleware } = require('../middleware/authMiddleware');

// Authenticate user is logged in before we allow methods Post, Patch, Delete

// Use the built-in HTTP method POST to create a route!
router.post('/', authMiddleware, createPost);
// Use the built-in HTTP method GET to create a route for getAllPosts!
router.get('/', getAllPosts);
// Use the built-in HTTP Method get! to get a single post.
router.get('/:id', getPost);
// use HTTP PATCH method to update a single post by id
router.patch('/:id', authMiddleware, updatePost);
// use express delete method to delete a single post by id
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
