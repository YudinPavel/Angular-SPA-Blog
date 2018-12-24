const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "https://pp.userapi.com/c847020/v847020475/148568/FSniOmuRmi4.jpg"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rights: {
        type: String,
        default: "user",
        enum: ["user", "admin", ]
    },
    // _id: {
    //     type: Number,
    //     required: true
    // },
    posts: {
        type: Array,
        default: []
    },
    subscriptions: {
        type: Array,
        default: []
    },
    createdData: {
        type: Date,
        default: Date.now
    },
    DayOfBirth: {
        type: Date,
        required: false
    },
    gender: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);