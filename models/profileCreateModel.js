const mongoose = require('mongoose')
const { Schema } = mongoose

const profileSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    name: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    bloodGroup: {
        type: String,
    },

    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },

    dob: {
        type: String,
        required: true
    },

    designation: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Profile", profileSchema)