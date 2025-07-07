const mongoose = require("mongoose");

const TestimonialVideoSchema = new mongoose.Schema({
    video:{
        type:String,
       
    },

    thumbnailImg:{
        type:String,
        required:[true,"thumbnail Image is required"],
    },

    title:{
        type:String,
        minlength: [1, "Title should be at least 1 characters long"],
        maxlength:[200,"Title should not exceed 200 characters"],
    },
    type:
    {
        type:String,
        // required:[true,"Type is required" ],
        minlength: [1, "Title should be at least 1 characters long"],
        
    }
})

const testimonialVideo = mongoose.model("testimonialvideos",TestimonialVideoSchema);

module.exports = testimonialVideo;