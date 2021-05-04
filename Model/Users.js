const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    tiktok: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        default: 0
    },
    booking: {
        type: Array,
        default: []
    }


},{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema)