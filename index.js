import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import postRoutes from './Routes/posts.js';
dotenv.config();
const app = express();
app.use(cors());
app.get('/',(req,res)=> res.send("Welcome to Nandy's Memories API"))
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);