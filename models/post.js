import mongoose from 'mongoose';
import moment from 'moment';
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    message: {
        type: String,
        required: true,
        min: 10,
    },
    creator: {
        type: String,
        required: true,
        min: 6
    },
    tags: {
        type: [String],
    },
    selectedFile: {
        type: String
    },
    likeCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: moment().format()
    }

});

export default mongoose.model('Post', postSchema)