import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import postRoutes from './Routes/posts.js';
import userRoutes from './Routes/users.js';
import { Strategy } from 'passport-twitter';
import passport from 'passport';
import session from 'express-session';
import { createImageUpload } from './controllers/image.js';



dotenv.config();
const app = express();
app.use(cors());
app.use(passport.initialize());
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true
    })
);
app.get('/', (req, res) => res.send("Welcome to Nandy's Memories API"))
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use('/posts', postRoutes);
app.use('/users', userRoutes);


app.use('/image-upload', createImageUpload)
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);