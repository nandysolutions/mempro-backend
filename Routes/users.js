import express from 'express';
import { signIn, signUp, getUsers } from '../controllers/user.js'
import auth from '../Middlewares/auth.js';
const router = express.Router();

router.get('/', getUsers)
router.post('/signin', signIn)
router.post('/signup', signUp)
// Update one User

export default router