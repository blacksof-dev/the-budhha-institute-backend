const mongoose = require("mongoose");
const validator = require('validator');

const NewsLetterSchema = new mongoose.Schema({

    name:{
        type:String,
    },

    email:{
        type:String,
        required:[true,"Please provide Email"],
         unique:true,
        validate:[validator.isEmail,'Please provide a valid email'],
    },

    source:{
        type:String,
        default:"The Buddha Institute Website"
    }
},{timestamps:true});

const NewsLetter = mongoose.model("newsletter",NewsLetterSchema);
module.exports = NewsLetter;