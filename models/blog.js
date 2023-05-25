const mongoose = require('mongoose')
// const { blob } = require('stream/consumers')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath:{
        type: String
    },
    blog:{
        type: String,
        required: true
    }
},
{timestamps: true})

module.exports = mongoose.model('Blog', blogSchema)