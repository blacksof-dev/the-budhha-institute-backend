const mongoose = require("mongoose");

const testimonialContentSchema = new mongoose.Schema({

    logo:{
        type:String,
        required:[true,"Logo is required"],
         
    },

    title:{
        type:String,
        required:[true, "Title is required"],
        minlength: [1, "Title should be at least 1 characters long"],
        maxlength:[200,"Title should not exceed 200 characters"],
    },

    desc:{
        type:String,
        required:[true, "Description is required"],
        minlength: [1, "Discription should be at least 1 characters long"],
    }
});

const testimonialContent = mongoose.model("testimonialcontent",testimonialContentSchema);

module.exports = testimonialContent;