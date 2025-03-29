const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../models/posts');

router.post('/posts',
  [auth, [check('title', 'Title is required').not().isEmpty(), check('description', 'Description is required').not().isEmpty()]],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: 'Invalid inputs'});
    }
   
    try {
      // Create a new post
      const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.user.id
      });

      // Save the post to the database
      await post.save();

      // Return the new post object
      res.json({
        id: post.id,
        title: post.title,
        description: post.description,
        createdAt: post.createdAt
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


module.exports = router;
// DELETE a post by ID
router.delete('/posts/:id', auth, async (req, res) => {
    try {
      // Find the post by ID and verify it was created by the authenticated user
      const post = await Post.findOne({ _id: req.params.id, author: req.user.id });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
 
      // Delete the post and its associated comments
      await Post.deleteOne({ _id: req.params.id });
 
      resstatus(204).json({ message: 'Post deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });