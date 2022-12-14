import mongoose from 'mongoose';
import moment from 'moment-timezone';
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
    name: {
        type: String
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
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [Object],
        default: []
    },
    date: {
        type: Date,
        default: moment().format()
    }

});

export default mongoose.model('Post', postSchema)