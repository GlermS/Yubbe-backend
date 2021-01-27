const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    },
    authorization:{
        type: String,
        default: 'client'
    },
    weeklyLimit:{
        type:Number,
        default:1
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.models.users||mongoose.model('users',UserSchema)