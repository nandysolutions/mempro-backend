import express from 'express';
import { signIn, signUp } from '../controllers/user.js'
const router = express.Router();

router.post('/signin', signIn)
router.post('/signup', signUp)
// Update one User
// router.patch('/:id', updatePost);

// Delete one Post
// router.delete('/:id', deletePost);

// Update likesCount for single Post
// router.patch('/:id/likePost', likePost);


export default router