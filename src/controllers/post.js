// Controller of our app that controls the post module
// Create a controller for creating a post module

// Import post db schema
const Post = require('../models/post');

// Create a createPost Controller
const createPost = async (req, res) => {
  // Destructure post attributes out of the body of the request
  const { title, author, description, likes, comments } = req.body;

  try {
    const post = await Post.create({
      title,
      author,
      description,
      likes,
      comments,
    });
    // Create a status code and send it to the client
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(`Error creating a post: ${error}.`);
  }
};

// Get all post (R of C R U D)
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(400).json(`Error getting all posts: ${error}.`);
  }
};

// Get a single post
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById({ _id: id });
    if (!post) {
      return res.status(404).json({ error: error.message });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a post!
const updatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ error: 'No matching post found.' });
    }
    res.status(200).json({
      message: `The post with the id of ${id} was updated successfully.`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a single post
const deletePost = async (req, res) => {
  // Get the id from the url params
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete({ _id: id });
    if (!post) {
      return res
        .status(404)
        .json({ error: 'Cannot delete, no matching post found.' });
    }
    res.status(200).json({
      message: `The post with the id of ${id} was deleted successfully.`,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createPost, getAllPosts, getPost, updatePost, deletePost };
