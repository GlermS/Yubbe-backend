const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
    date:{
        type: Date,
        required:true,
    },
    theme:{
        type: {type: mongoose.Schema.Types.ObjectId, ref: "themes"},
    },
    moderatorId:{
        type: {type: mongoose.Schema.Types.ObjectId, ref: "users"},
    },
    clients:{
        type:[{type: mongoose.Schema.Types.ObjectId, ref: "users"}],
        
        default:[],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.models.calls||mongoose.model('calls',CallSchema)