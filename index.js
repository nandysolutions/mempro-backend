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

dotenv.config();
const app = express();
let user = {}
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
})
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

passport.use(new Strategy({
    consumerKey: process.env.TWITTER_APIKEY,
    consumerSecret: process.env.TWITTER_API_SECRET,
    callbackURL: "http://localhost:5000/auth/twitter/callback"
},
    function (token, tokenSecret, profile, cb) {
        console.log(profile)
        console.log(token)
        user = { ...profile }
        cb(null, profile)
    }
));

app.get('/auth/twitter',
    passport.authenticate('twitter'));

app.use('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/none' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.status(201).json(user)
    });
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);