import Post from "../models/post.js";
import mongoose from 'mongoose';
import post from "../models/post.js";
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const createPost = async (req, res) => {
    const post = new Post(req.body);
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
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ message: "No post with that id!" })
    const cur_post = await Post.findById(id);
    const upd_post = await Post.findByIdAndUpdate(id, { likeCount: cur_post.likeCount + 1 }, { new: true });
    res.status(201).json(upd_post)
}
