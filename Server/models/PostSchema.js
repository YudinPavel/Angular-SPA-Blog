const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    //id: number;
    text: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },
    createdData: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);