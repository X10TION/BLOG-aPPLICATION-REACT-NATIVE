const mongoose = require("mongoose")

const featurePost = mongoose.Schema({
    post:{
        type:mongoose.Schema.ObjectId,
        ref:'Post',
        require: true,
    }

},{
    timestamps:true
})


module.exports = mongoose.model('Featured', featurePost )