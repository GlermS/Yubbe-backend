const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        unique:true
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.models.theme||mongoose.model('theme',ThemeSchema)