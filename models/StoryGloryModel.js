const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({

    video:{
        type:String,
        required:[true,"Video is required"]    
    },

    thumbnailImg:{
        type:String,
        required:[true,"Thumbnail Image is required"] 
    },
    
    title:{
        type:String,
    }
    
});


const StoryGlories = mongoose.model("storyglory",StorySchema);

module.exports = StoryGlories;