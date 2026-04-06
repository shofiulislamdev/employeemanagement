const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowerCase: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address' 
        ]
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        min: [5, "Too Low"],
        max: [8, "Too High"],
        // match: [
        //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
        //     'Please enter a valid password' 
        // ]
    },

    photo: {
        type: String
    },

    nid: {
        type: Number,
        min: [10, "Too Low"],
        max: [17, "Too High"],
    },

    address: {
        type: String,
    },

    isLogin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("User", userSchema)

