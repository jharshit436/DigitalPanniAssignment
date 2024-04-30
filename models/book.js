const userModel=require('./user')
const mongoose = require("mongoose");

const bookSchema=new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is require"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:userModel
    },
    publicationYear:{
        type:Number,
        required:true 
    }
},{ timestamps: true });

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;