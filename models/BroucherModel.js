const mongoose = require("mongoose");

const BrouserSchema = new mongoose.Schema({
 
    cover:
    {
        type:String,
        required:[true,"Cover Image is required"]
    },

    tag:{
        type:String,
    },

    titlebrochures:{
        type:String,
        required:[true,"Title heading is required"],
        minlength: [1, "Title should be at least 3 characters long"],
        maxlength:[200,"Title should not exceed 200 characters"],
    },

    title:{
        type:String,
        required:[true,"Title heading is required"],
        minlength: [3, "Title should be at least 3 characters long"],
        maxlength:[200,"Title should not exceed 200 characters"],
    },

    targetpdf:{
        type:String,
        required:[true," Pdf is required"]
    }
},{timestamps:true});

const Brouser = mongoose.model("brouser", BrouserSchema);

module.exports = Brouser;