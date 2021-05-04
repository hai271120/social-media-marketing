const mongoose = require("mongoose")
const influencerSchema = new mongoose.Schema({
    influencer_id:{
        type:String,
        unique:true,
        required:true,
    },
    name:{
        type:String,
        required:true
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
    images:{
        type: Object,
        required: true
    },
    address: {
        type: String,
        required: true,
    }, },
    {
        timestamps: true 
    })
    
    module.exports = mongoose.model("Influencer", influencerSchema)