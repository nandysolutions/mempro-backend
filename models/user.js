import mongoose from 'mongoose';
import moment from 'moment';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 10,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },

    id: {
        type: String,
    },
});

export default mongoose.model('User', userSchema)