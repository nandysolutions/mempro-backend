import express from 'express';
import { createPost, getPosts, updatePost, deletePost, likePost } from '../controllers/posts.js'
const router = express.Router();

// Get all posts data
router.get('/', getPosts)

// Submit one post to database
router.post('/', createPost);

// Update one Post
router.patch('/:id', updatePost);

// Delete one Post
router.delete('/:id', deletePost);

// Update likesCount for single Post
router.patch('/:id/likePost', likePost);


export default router