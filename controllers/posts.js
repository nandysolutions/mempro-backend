import Post from "../models/post.js";
import mongoose from 'mongoose';
import moment from 'moment';
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createPost = async (req, res) => {
    const post = new Post({ ...req.body, date: new Date().toISOString(), creator: req.userId });
    try {
        await post.save();
        res.status(201).json(post)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

// Update one post
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.isValidObjectId(_id)) return res.status(404).json({ message: "No post with that id!" })
    const upd_post = await Post.findByIdAndUpdate(_id, { ...post, _id: _id }, { new: true })
    res.status(201).json(upd_post)
}

// Delete one post
export const deletePost = async (req, res) => {
    const { id } = req.params;
    await Post.findByIdAndRemove(id)
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ message: "No post with that id!" })
    try {
        res.status(200).json({ message: `Post ${id} delted Successfully!` })
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

// Update likesCount for the post
export const likePost = async (req, res) => {
    if (!req.userId) return res.status(400).json({ message: "Access Denied!" })
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    // if (!mongoose.isValidObjectId(id)) return res.status(404).json({ message: "No post with that id!" })
    const cur_post = await Post.findById(id);
    const index = cur_post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
        //Like the post
        cur_post.likes.push(req.userId)
    }
    else {
        //Dislike the post
        cur_post.likes = cur_post.likes.filter((id) => id !== String(req.userId))
    }

    const upd_post = await Post.findByIdAndUpdate(id, cur_post, { new: true });
    res.status(201).json(upd_post)
}

export const commentPost = async (req, res) => {
    if (!req.userId) return res.status(400).json({ message: "Access Denied!" })
    const { id } = req.params;
    const newId2 = new mongoose.Types.ObjectId();

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const cur_post = await Post.findById(id);
    // const index = cur_post.comments.user.findIndex(({ id }) => id === String(req.userId))
    // if (index !== -1) {
    //Comment the post
    cur_post.comments.push({ id: req.userId, commentAt: new Date().toISOString(), comment: req.body.comment, c_id: newId2, name: req.body.user.name })
    // cur_post.comments.comments.push(req.body.comment)
    // }
    // else {
    // cur_post.comments.comments = req.body.comment
    // cur_post.comments.user = [{ id: req.userId, commentAt: new Date().toISOString(), comment: req.body.comment }]
    // }
    const upd_post = await Post.findByIdAndUpdate(id, cur_post, { new: true });
    res.status(201).json(upd_post)
}
export const deleteComment = async (req, res) => {
    if (!req.userId) return res.status(400).json({ message: "Access Denied!" })
    const { id } = req.params;
    const c_id = req.body.c_id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    const cur_post = await Post.findById(id);
    const comments = cur_post.comments
    const upd_comments = comments.filter((item) => String(item?.c_id) !== c_id)
    cur_post.comments = upd_comments
    const upd_post = await Post.findByIdAndUpdate(id, cur_post, { new: true });
    res.status(201).json(upd_post)
};