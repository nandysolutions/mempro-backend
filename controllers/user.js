import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) return res.json({ message: "Please register first :)" })
        const isPasscheck = await bcrypt.compare(password, existingUser.password);
        if (!isPasscheck) return res.json({ message: "Incorrect Password!" })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET, { expiresIn: "1h" })
        res.status(200).json({ result: existingUser, token })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}

export const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmpass } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.json({ message: "Email already exists! Please login :)" })
        if (password !== confirmpass) return res.json({ message: "Passwords doesn't match!" })
        const hashedPass = await bcrypt.hash(password, 12)
        const result = await User.create({ email, password: hashedPass, name: `${firstName} ${lastName}` })
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "1h" })
        res.status(201).json({ result, token })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, { name: 1 })
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong :(" })
    }
}