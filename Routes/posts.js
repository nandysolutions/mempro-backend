import express from 'express';
import { createPost, getPosts, updatePost, deletePost, likePost, commentPost, deleteComment } from '../controllers/posts.js'
import auth from '../Middlewares/auth.js';
const router = express.Router();

// Get all posts data
router.get('/', getPosts)

// Submit one post to database
router.post('/', auth, createPost);

// Update one Post
router.patch('/:id', auth, updatePost);

// Delete one Post
router.delete('/:id', auth, deletePost);

// Update likesCount for single Post
router.patch('/:id/likePost', auth, likePost);

// Add comments to post
router.patch('/:id/commentPost', auth, commentPost);

// Delete comment
router.patch('/:id/deleteComment', auth, deleteComment);


export default router